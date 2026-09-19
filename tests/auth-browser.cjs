// Run against a production preview on localhost:3000: npm run test:auth:browser
// Uses installed Chrome, or AUTH_CHROME_PATH. API requests are isolated fixtures.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const TOKEN='eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjMiLCJleHAiOjQxMDI0NDQ4MDB9.signature';
const user={id:123,uuid:'test-user',email:'qa@example.test',name:'QA User',first_name:'QA',last_name:'User',roles:['client'],verified:true,country_id:1,profile_photo_url:null};
(async()=>{
 const browser=await chromium.launch({...(process.env.AUTH_CHROME_PATH ? { executablePath: process.env.AUTH_CHROME_PATH } : {channel:'chrome'}),headless:true});
 const results=[];
 fs.mkdirSync('/tmp/insighta-auth-qa',{recursive:true});
 async function scenario(name,run,options={}) {
  const context=await browser.newContext({viewport:{width:1440,height:1000},...options});
  const calls=[];let mode='success';
  await context.route('https://api.insightabusiness.com/**',async route=>{
   const req=route.request(), url=new URL(req.url()); calls.push({path:url.pathname,method:req.method(),body:req.postDataJSON?.()});
   let status=200,payload={data:[]};
   if(url.pathname.endsWith('/auth/login')) {
    if(mode==='invalid'){status=422;payload={message:'User does not exist',errors:{email:['User does not exist']}};}
    else if(mode==='limited'){status=429;payload={message:'Too many requests'};}
    else payload={data:{...user,verified:mode!=='unverified',token:TOKEN}};
   } else if(url.pathname.endsWith('/auth/register')) payload={data:{...user,verified:false,token:TOKEN}};
   else if(url.pathname.endsWith('/account/profile')) payload={data:user};
   else if(url.pathname.endsWith('/country/list')) payload={data:[{id:1,name:'Jordan',flag:'jordan'},{id:2,name:'United Kingdom',flag:'united-kingdom'}]};
   else if(url.pathname.includes('/guideline/type/')) payload={data:{name:'Terms of service',guideline:'<p>Test terms of service.</p><img src=x onerror="window.__unsafe=true"><script>window.__unsafe=true</script>',uuid:'agreement-test'}};
   else if(url.pathname.endsWith('/agreement/check')) payload={data:{accept:true}};
   else if(url.pathname.includes('/auth/provider/')) payload='https://accounts.google.com/o/oauth2/auth?test=1';
   await route.fulfill({status,contentType:typeof payload==='string'?'text/plain':'application/json',body:typeof payload==='string'?payload:JSON.stringify(payload),headers:{'Access-Control-Allow-Origin':'*'}});
  });
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{await run({page,context,calls,setMode:v=>mode=v});results.push({name,ok:true,errors});}
  catch(e){results.push({name,ok:false,error:e.message,errors,url:page.url()});await page.screenshot({path:'/tmp/insighta-auth-qa/failure-'+results.length+'.png'});}
  await context.close();
 }
 await scenario('English desktop: isolated shell and password accessibility',async({page})=>{
  await page.goto('http://localhost:3000/en/signin');await page.getByRole('heading',{name:'Welcome To Insighta'}).waitFor();
  assert.equal(await page.locator('input[name=email]').getAttribute('autocomplete'),'username');
  await page.getByRole('button',{name:'Show password',exact:true}).click();assert.equal(await page.locator('#password').getAttribute('type'),'text');
  assert.equal(await page.locator('script[src*=googletagmanager]').count(),0);
  assert.equal(await page.locator('link[href*=keenicons]').count(),0);
  await page.screenshot({path:'/tmp/insighta-auth-qa/signin-desktop.png',fullPage:true});
  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,transfer:r.transferSize,encoded:r.encodedBodySize,decoded:r.decodedBodySize})));
  fs.writeFileSync('/tmp/insighta-auth-qa/resources.json',JSON.stringify(resources,null,2));
 });
 await scenario('Arabic mobile layout and language switch preserves returnUrl',async({page})=>{
  await page.goto('http://localhost:3000/ar/signin?returnUrl=%2Far%2Fproject');
  await page.getByRole('heading',{name:'أهلاً بكم في إنسايتا'}).waitFor();
  assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.screenshot({path:'/tmp/insighta-auth-qa/signin-mobile-ar.png',fullPage:true});
  await page.getByRole('link',{name:'English',exact:true}).click();await page.waitForURL('**/en/signin?returnUrl=*');
 },{viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:2});
 await scenario('Onboarding panel stays centered and bounded',async({page,context})=>{
  await context.addCookies([{name:'token',value:TOKEN,url:'http://localhost:3000'}]);
  await context.route('**/api/account/profile/onboarding/prompts/status',route=>route.fulfill({json:{data:[{prompt_key:'community_feed_industries',status:'pending',should_show:true,cannot_skip:false}]}}));
  await context.route('**/api/common/setting/industry/tree',route=>route.fulfill({json:[{key:1,label:'Agriculture',children:[{key:2,label:'Farming'}]}]}));
  await page.goto('http://localhost:3000/en/onboarding');await page.getByRole('heading',{name:'Which industries are you interested in?'}).waitFor();
  const box=await page.locator('main > section').boundingBox();assert(box.width<=880);assert(Math.abs(box.x-(1440-box.width)/2)<2);
  await page.screenshot({path:'/tmp/insighta-auth-qa/onboarding-centered.png',fullPage:true,animations:'disabled'});
 });
 await scenario('Inline validation and subtle field focus',async({page,calls})=>{
  await page.goto('http://localhost:3000/en/signin');await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.locator('#email-error').waitFor();await page.locator('#password-error').waitFor();
  assert.equal(calls.filter(c=>c.path.endsWith('/auth/login')).length,0);
  assert.equal(await page.locator('form').getAttribute('novalidate'),'');
  await page.locator('#email').fill('invalid');await page.locator('#password').click();await page.getByText('Enter a valid email address.',{exact:true}).waitFor();
  await page.locator('#email').focus();assert.equal(await page.locator('#email').evaluate(el=>getComputedStyle(el).boxShadow),'none');
  assert.equal(await page.locator('#email').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
 });
 await scenario('Registration server errors appear below the matching field',async({page,context,calls})=>{
  await context.route('**/api/auth/register',route=>route.fulfill({status:422,json:{message:'Validation failed',errors:{email:['This email is already registered.']}}}));
  await page.goto('http://localhost:3000/en/signup');await page.locator('#first_name').fill('Test');await page.locator('#last_name').fill('User');await page.locator('#email').fill('qa@example.test');await page.locator('#password').fill('Password1!');await page.getByRole('combobox').fill('Jordan');await page.getByRole('option',{name:'Jordan',exact:true}).click();
  await page.getByRole('button',{name:'terms of service',exact:true}).click();await page.getByRole('button',{name:'I agree',exact:true}).click();await page.getByRole('button',{name:'Create account',exact:true}).click();
  await page.locator('#email-error').filter({hasText:'This email is already registered.'}).waitFor();assert.equal(await page.locator('#email').getAttribute('aria-invalid'),'true');
 });
 await scenario('Country search, flags and keyboard selection',async({page})=>{
  await page.goto('http://localhost:3000/en/signup');await page.getByRole('combobox').fill('king');
  assert.equal(await page.getByRole('option').count(),1);assert.equal(await page.getByRole('option').locator('img').getAttribute('src'),'/images/flags/united-kingdom.svg');
  await page.getByRole('combobox').press('Enter');assert.equal(await page.locator('input[name=country_id]').inputValue(),'2');
 });
 await scenario('OTP typing, backspace, Arabic paste and mobile layout',async({page,context,calls})=>{
  await context.addCookies([{name:'token',value:TOKEN,url:'http://localhost:3000'}]);await page.goto('http://localhost:3000/ar/verify-email');
  await page.getByRole('button',{name:'تأكيد البريد',exact:true}).click();await page.locator('#code-error').waitFor();assert.equal(calls.filter(c=>c.path.endsWith('/account/email/verify')).length,0);
  await page.locator('#code').pressSequentially('12');assert.equal(await page.locator('#code-1').inputValue(),'2');assert.equal(await page.locator('#code-2').evaluate(el=>el===document.activeElement),true);
  await page.locator('#code-2').press('Backspace');assert.equal(await page.locator('#code-1').inputValue(),'');
  await page.locator('#code-1').evaluate(el=>{const data=new DataTransfer();data.setData('text','١٢٣٤٥٦');el.dispatchEvent(new ClipboardEvent('paste',{clipboardData:data,bubbles:true,cancelable:true}));});
  assert.equal(await page.locator('input[name=code]').inputValue(),'123456');assert.equal(await page.locator('.auth-code input').count(),6);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.screenshot({path:'/tmp/insighta-auth-qa/otp-mobile-ar.png',fullPage:true});
  await page.getByRole('button',{name:'تأكيد البريد',exact:true}).click();await page.waitForURL('http://localhost:3000/ar');assert.equal(calls.find(c=>c.path.endsWith('/account/email/verify')).body.code,123456);
 },{viewport:{width:390,height:844},isMobile:true});
 await scenario('Invalid login and rate limit preserve retryable form',async({page,calls,setMode})=>{
  await page.goto('http://localhost:3000/en/signin');await page.locator('#email').fill('qa@example.test');await page.locator('#password').fill('Password1!');
  setMode('invalid');await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('alert').filter({hasText:'The email or password is incorrect.'}).waitFor();
  assert(!await page.locator('.auth-error').textContent().then(t=>t.includes('does not exist')));
  setMode('limited');await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('alert').filter({hasText:'Too many attempts'}).waitFor();
 });
 await scenario('Successful login: no duplicate profile fetch, cookie only, safe return',async({page,calls})=>{
  await page.goto('http://localhost:3000/en/signin?returnUrl=%2Fen%2Flegals%2Fprivacy');
  await page.locator('#email').fill('qa@example.test');await page.locator('#password').fill('Password1!');await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.waitForURL('**/en/legals/privacy');
  assert.equal(calls.filter(c=>c.path==='/api/account/profile').length,0);
  assert.equal(await page.evaluate(()=>localStorage.getItem('token')),null);
  assert(!page.url().includes(TOKEN));
 });
 await scenario('Unverified login: resend, OTP validation, then callback',async({page,calls,setMode})=>{
  setMode('unverified');await page.goto('http://localhost:3000/en/signin');await page.locator('#email').fill('qa@example.test');await page.locator('#password').fill('Password1!');await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.waitForURL('**/en/verify-email?*');await page.getByText('A verification code has been sent.').waitFor();
  await page.locator('#code').fill('123456');await page.getByRole('button',{name:'Verify email',exact:true}).click();await page.waitForURL('http://localhost:3000/en');
  assert.equal(calls.filter(c=>c.path.endsWith('/account/email/verify'))[0].body.code,123456);
 });
 await scenario('Signup: terms sanitized, country, registration payload, OTP page',async({page,calls})=>{
  await page.goto('http://localhost:3000/en/signup?returnUrl=%2Fen%2Fproject');
  await page.locator('#first_name').fill('Test');await page.locator('#last_name').fill('User');await page.locator('#email').fill('qa@example.test');await page.locator('#password').fill('Password1!');await page.locator('#country_id').fill('jord');await page.getByRole('option',{name:'Jordan',exact:true}).click();
  await page.getByRole('button',{name:'terms of service',exact:true}).click();await page.getByRole('button',{name:'I agree',exact:true}).click();assert.equal(await page.evaluate(()=>!!window.__unsafe),false);
  await page.getByRole('button',{name:'Create account',exact:true}).click();await page.waitForURL('**/en/verify-email?*');
  const body=calls.find(c=>c.path.endsWith('/auth/register')).body;assert.equal(body.client_agreement,true);assert.equal(body.country_id,1);assert.equal(body.password_confirmation,body.password);
 });
 await scenario('Password reset: request, mismatch prevention, complete',async({page,calls})=>{
  await page.goto('http://localhost:3000/en/reset-password');await page.locator('#email').fill('qa@example.test');await page.getByRole('button',{name:'Send code'}).click();await page.locator('#code').fill('123456');await page.locator('#password').fill('Password1!');await page.locator('#password_confirmation').fill('Different1!');await page.getByRole('button',{name:'Save password'}).click();await page.getByRole('alert').filter({hasText:'Passwords do not match'}).waitFor();
  await page.locator('#password_confirmation').fill('Password1!');await page.getByRole('button',{name:'Save password'}).click();await page.getByRole('status').filter({hasText:'Your password has been updated'}).waitFor();assert.equal(calls.filter(c=>c.path.endsWith('/auth/password/reset')).length,1);
 });
 await scenario('Legacy callback strips token server-side, external return rejected',async({page,context})=>{
  await page.goto('http://localhost:3000/en/callback/'+TOKEN+'?returnUrl=https%3A%2F%2Fevil.example');await page.waitForURL('http://localhost:3000/en');assert(!page.url().includes(TOKEN));assert((await context.cookies()).some(c=>c.name==='token'));
 });
 await scenario('Logout revokes before clearing and rejects external redirect',async({page,context,calls})=>{
  await context.addCookies([{name:'token',value:TOKEN,url:'http://localhost:3000'}]);await page.goto('http://localhost:3000/en/signout?redirect_uri=https%3A%2F%2Fevil.example');await page.waitForURL('http://localhost:3000/en');assert.equal(calls.filter(c=>c.path.endsWith('/account/logout')).length,1);assert(!(await context.cookies()).some(c=>c.name==='token'));
 });
 await scenario('Social sign in only navigates to the expected provider',async({page,context})=>{
  await context.route('https://accounts.google.com/**',route=>route.fulfill({body:'OAuth provider fixture',contentType:'text/html'}));
  await page.goto('http://localhost:3000/en/signin?returnUrl=%2Fen%2Fproject');
  await page.getByRole('button',{name:'Use Google',exact:true}).click();
  await page.waitForURL('https://accounts.google.com/**');
  const cookies=await context.cookies('http://localhost:3000');assert.equal(decodeURIComponent(cookies.find(c=>c.name==='auth_return_url').value),'/en/project');
 });
 await scenario('Legacy URLs route to localized Next auth without Angular',async({page})=>{
  await page.goto('http://localhost:3000/auth/login?returnUrl=%2Fen%2Fproject');await page.waitForURL('**/en/signin?returnUrl=*');
  await page.goto('http://localhost:3000/ar/auth/sign-up');await page.getByRole('heading',{name:'إنشاء حساب في إنسايتا'}).waitFor();
  assert(page.url().endsWith('/ar/signup'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.screenshot({path:'/tmp/insighta-auth-qa/signup-mobile-ar.png',fullPage:true});
 },{viewport:{width:390,height:844},isMobile:true});
 await scenario('Transient callback failure retains session and offers retry',async({page,context})=>{
  await context.addCookies([{name:'token',value:TOKEN,url:'http://localhost:3000'}]);
  await context.route('https://api.insightabusiness.com/api/account/profile',route=>route.abort());
  await page.goto('http://localhost:3000/en/callback');await page.getByRole('button',{name:'Try again',exact:true}).waitFor();
  assert((await context.cookies()).some(c=>c.name==='token'));assert(page.url().endsWith('/en/callback'));
 });
 await scenario('Invalid signed email link never sends a token to another host',async({page,context,calls})=>{
  await context.addCookies([{name:'token',value:TOKEN,url:'http://localhost:3000'}]);
  await page.goto('http://localhost:3000/en/verify-email?url=https%3A%2F%2Fevil.example%2Fapi%2Femail%2Fverify%2F1');
  await page.locator('.auth-error').filter({hasText:'Invalid verification link'}).waitFor();assert.equal(calls.length,0);
 });
 if(process.env.AUTH_ANGULAR_URL) await scenario('Angular legacy callback consumes token and preserves locale before Next handoff',async({page,context})=>{
  await context.addCookies([{name:'preferred_language',value:'ar',url:process.env.AUTH_ANGULAR_URL}]);
  await page.goto(process.env.AUTH_ANGULAR_URL+'/auth/callback?token='+TOKEN+'&returnUrl=%2Far%2Flegals%2Fprivacy');
  await page.waitForURL('http://localhost:3000/ar/legals/privacy');
  assert(!page.url().includes(TOKEN));assert((await context.cookies()).some(c=>c.name==='token'));
 });
 console.log(JSON.stringify(results,null,2));fs.writeFileSync('/tmp/insighta-auth-qa/results.json',JSON.stringify(results,null,2));await browser.close();if(results.some(r=>!r.ok||r.errors.length))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});

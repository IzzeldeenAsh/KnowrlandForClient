export const metadata = {
  title: 'The Most Valuable Asset in Business - Knoldg',
  description: 'Discover what truly matters for business success in today\'s competitive landscape and how to leverage it to your advantage.',
}

import Link from 'next/link'
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import BlogImage from '@/public/images/blog-post-01.jpg'
import Avatar from '@/public/images/post-avatar.jpg'
import Particles from '@/components/particles'

export default function BlogPost() {
  return (
    <section className="relative">

      {/* Radial gradient */}
      <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* Particles animation */}
      <Particles className="absolute inset-0 h-96 -z-10" quantity={15} />

      {/* Illustration */}
      <div className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10" aria-hidden="true">
        <Image src={Illustration} className="max-w-none" width={1440} height={427} alt="Page Illustration" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-40">

          <div className="md:flex md:justify-between">

            {/* Page content */}
            <div className="md:grow pb-12 md:pb-20">
              <div className="max-w-[720px]">

                <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-16">

                  {/* Back button */}
                  <div className="shrink-0">
                    <div className="sticky top-6">
                      <Link className="flex items-center justify-center w-9 h-9 group border border-transparent rounded-full [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="/blog">
                        <span className="sr-only">Go back</span>
                        <svg className="w-4 h-4 fill-purple-500" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <article className="pb-12 mb-12 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1]">
                      <header className="mb-8">
                        {/* Post date */}
                        <div className="mb-3 text-xs font-medium text-slate-500">May 10, 2025</div>
                        {/* Post title */}
                        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">The Most Valuable Asset in Business</h1>
                        {/* Author */}
                        <div className="flex items-center mt-4">
                          <Image className="rounded-full" src={Avatar} width={40} height={40} alt="Author" />
                          <div className="ml-4">
                            <div className="font-medium text-slate-300">Sarah Johnson</div>
                            <div className="text-sm text-slate-500">Chief Strategy Officer</div>
                          </div>
                        </div>
                      </header>
                      
                      <figure className="bg-slate-700/20 border border-slate-300/10 p-4 rounded-3xl mb-8">
                        <Image className="w-full rounded-2xl" src={BlogImage} width={768} height={432} alt="Blog featured image" priority />
                      </figure>

                      {/* Post content */}
                      <div className="prose max-w-none text-slate-400 prose-headings:text-slate-50 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-medium prose-blockquote:pl-5 prose-blockquote:xl:-ml-5 prose-blockquote:border-l-2 prose-blockquote:border-purple-500 prose-blockquote:font-medium prose-blockquote:text-slate-300 prose-blockquote:italic">
                        <h2>The Hidden Value of Knowledge</h2>
                        <p>
                          In today's rapidly evolving business landscape, organizations are constantly seeking that elusive competitive edge. While many focus on cutting-edge technology, innovative products, or aggressive marketing strategies, they often overlook what has become the most valuable asset in modern business: <strong>knowledge</strong>.
                        </p>
                        <p>
                          Knowledge, when properly harnessed, becomes the cornerstone of innovation, efficiency, and sustainable growth. Unlike physical assets that depreciate over time, knowledge appreciates as it's shared, refined, and applied to new challenges. The question isn't whether knowledge is valuable—it's how to effectively capture, organize, and leverage it across your organization.
                        </p>
                        <h2>Why Knowledge Management Matters</h2>
                        <p>
                          Organizations that excel at knowledge management significantly outperform their peers. According to recent studies, companies with robust knowledge management systems experience:
                        </p>
                        <ul>
                          <li>25% higher productivity among knowledge workers</li>
                          <li>20% faster time-to-market for new products</li>
                          <li>18% reduction in costly mistakes and rework</li>
                          <li>35% improvement in employee onboarding efficiency</li>
                        </ul>
                        <p>
                          These numbers translate directly to bottom-line results. But achieving these benefits requires more than just implementing a knowledge base or document repository. It demands a strategic approach that addresses both technology and culture.
                        </p>
                        <h2>Building a Knowledge-Driven Organization</h2>
                        <p>
                          Creating a knowledge-driven organization involves several key components:
                        </p>
                        <ol>
                          <li><strong>Culture of sharing</strong>: Foster an environment where knowledge sharing is recognized and rewarded.</li>
                          <li><strong>Accessible systems</strong>: Implement intuitive tools that make knowledge easy to find and consume.</li>
                          <li><strong>Structured processes</strong>: Establish clear workflows for capturing, validating, and updating knowledge.</li>
                          <li><strong>Executive support</strong>: Ensure leadership actively participates in and champions knowledge initiatives.</li>
                        </ol>
                        <p>
                          When these elements align, organizations can transform tacit knowledge (experience and expertise residing in employees' minds) into explicit knowledge (documented and accessible resources).
                        </p>
                        <blockquote>
                          "The only sustainable advantage a company has is what it collectively knows, how efficiently it uses what it knows, and how quickly it acquires and uses new knowledge."
                        </blockquote>
                        <h2>Overcoming Common Challenges</h2>
                        <p>
                          Despite its value, many organizations struggle with knowledge management. Common obstacles include:
                        </p>
                        <ul>
                          <li>Information silos between departments</li>
                          <li>Resistance to sharing (the "knowledge is power" mindset)</li>
                          <li>Poor user experience in knowledge systems</li>
                          <li>Difficulty keeping information current and relevant</li>
                        </ul>
                        <p>
                          Addressing these challenges requires a combination of technological solutions and cultural initiatives. Modern AI-powered knowledge platforms can help bridge these gaps by automatically organizing information, suggesting relevant content, and even identifying knowledge gaps that need to be filled.
                        </p>
                        <h2>The Future of Knowledge Management</h2>
                        <p>
                          As we look ahead, several trends are reshaping how organizations approach knowledge management:
                        </p>
                        <ul>
                          <li><strong>AI and machine learning</strong>: Automating knowledge discovery and organization</li>
                          <li><strong>Personalized knowledge delivery</strong>: Providing the right information at the right time</li>
                          <li><strong>Community-driven knowledge</strong>: Harnessing collective intelligence through collaboration</li>
                          <li><strong>Knowledge graphs</strong>: Mapping relationships between information to provide context</li>
                        </ul>
                        <p>
                          Organizations that embrace these innovations will be well-positioned to turn their knowledge into a sustainable competitive advantage.
                        </p>
                        <h2>Conclusion</h2>
                        <p>
                          In a world where products can be copied, processes can be replicated, and technology quickly becomes commoditized, an organization's collective knowledge remains its most defensible asset. By investing in effective knowledge management strategies and tools, businesses can unlock innovation, improve decision-making, and build resilience against market disruptions.
                        </p>
                        <p>
                          The most valuable asset in business isn't something you can put on a balance sheet—it's the knowledge that flows through your organization every day. The companies that succeed in capturing, sharing, and leveraging that knowledge will be the ones that thrive in the knowledge economy.
                        </p>
                      </div>
                    </article>

                    <aside className="pl-6 border-l-2 border-purple-500">
                      <p className="inline-flex font-medium italic text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">"Effective knowledge management isn't just a competitive advantage—it's the foundation of sustainable business success in the digital age."</p>
                      <footer className="flex items-center space-x-4">
                        <Image className="shrink-0 rounded-full" src={Avatar} width={32} height={32} alt="Author" />
                        <div className="text-sm font-medium text-slate-300">
                          Sarah Johnson <span className="text-slate-700">-</span> <a className="text-purple-500 hover:underline" href="#0">Chief Strategy Officer</a>
                        </div>
                      </footer>
                    </aside>
                  </div>

                </div>

              </div>
            </div>

            {/* Sidebar */}
            <aside className="md:w-64 lg:w-80 md:shrink-0 md:pt-[3.75rem] lg:pt-0 pb-12 md:pb-20">
              <div className="sticky top-6 md:pl-6 lg:pl-10">

                {/* Sidebar content */}
                <div className="space-y-6">

                  {/* Widget */}
                  <div className="bg-gradient-to-tr from-slate-800 to-slate-800/25 rounded-3xl border border-slate-800">
                    <div className="px-5 py-6">
                      <div className="text-center mb-5">
                        <div className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">Subscribe to our newsletter</div>
                        <div className="text-sm text-slate-500">Stay up to date with the latest insights</div>
                      </div>
                      <form className="space-y-3">
                        <div className="relative">
                          <input className="w-full form-input bg-slate-800/30 border border-slate-800 focus:border-purple-500 text-sm py-1.5 text-slate-300" type="email" placeholder="Your email" aria-label="Your email" required />
                        </div>
                        <button className="btn-sm w-full text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/70 before:rounded-full before:pointer-events-none">
                          <span className="relative inline-flex items-center">
                            Subscribe <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Widget */}
                  <div className="bg-gradient-to-tr from-slate-800 to-slate-800/25 rounded-3xl border border-slate-800">
                    <div className="px-5 py-6">
                      <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1 mb-4">Related Articles</h3>
                      <ul className="space-y-4">
                        <li className="border-b border-slate-800 pb-4">
                          <Link className="flex items-center space-x-3" href="/blog/strategies-for-digital-transformation">
                            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <Image className="w-full h-full object-cover" src="/images/blog-post-02.jpg" width={64} height={64} alt="Related article" />
                            </div>
                            <div className="text-sm text-slate-300 font-medium">5 Strategies for Digital Transformation</div>
                          </Link>
                        </li>
                        <li className="border-b border-slate-800 pb-4">
                          <Link className="flex items-center space-x-3" href="/blog/building-sustainable-business-models">
                            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <Image className="w-full h-full object-cover" src="/images/blog-post-03.jpg" width={64} height={64} alt="Related article" />
                            </div>
                            <div className="text-sm text-slate-300 font-medium">Building Sustainable Business Models</div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

          </div>

        </div>
      </div>
    </section>
  )
}

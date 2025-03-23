import Particles from './particles'
import Link from 'next/link'

export default function Cta02() {
  return (
    <section className="relative">

      {/* Particles animation */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24">
        <Particles className="absolute inset-0 -z-10" quantity={6} staticity={30} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative px-8 py-12 md:py-20 border-t border-b [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1]">
          {/* Blurred shape */}
          <div className="absolute top-0 -mt-24 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-70 pointer-events-none -z-10" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs4-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7"></stop>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path fill="url(#bs4-a)" fillRule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)"></path>
            </svg>
          </div>
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Join Us in Redefining Knowledge Sharing</h2>
            <p className="text-lg text-slate-400 mb-6">At Knoldg, we believe that knowledge should be an asset that benefits both creators and consumers. Join our growing community of experts and professionals to explore, share, and gain valuable insights that drive progress.</p>
            <div className="mb-6">
              <Link href="https://app.knoldg.com/auth/sign-up" className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group">
                Join Now <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out mx-1">-&gt;</span>
              </Link>
            </div>
            <p className="text-sm text-slate-500">For inquiries and collaborations, reach out to us at <a href="mailto:info@knoldg.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-150 ease-in-out">info@knoldg.com</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
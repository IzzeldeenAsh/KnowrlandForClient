export const metadata = {
  title: 'Changelog - Knoldg',
  description: 'Page description',
}

import { getUpdatePosts } from '@/components/mdx/utils'
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'
import PostItem from './post-item'
import Cta from '@/components/cta-03'

export default function Changelog() {
  const allUpdates = getUpdatePosts();

  // Sort posts by date
  allUpdates.sort((a, b) => {
    return (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) ? -1 : 1
  })

  return (
    <>

      {/* Content */}
      <section className="relative">

        {/* Radial gradient */}
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
          <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute w-64 h-64 translate-z-0 bg-blue-400 rounded-full blur-[80px] opacity-70"></div>
        </div>

        {/* Particles animation */}
        <div className="absolute inset-0 h-96 -z-10" aria-hidden="true">
          <canvas data-particle-animation data-particle-quantity="15"></canvas>
        </div>

        {/* Illustration */}
        <div className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10" aria-hidden="true">
          <Image src={Illustration} className="max-w-none" width={1440} height={427} alt="Page Illustration" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="text-center pb-12 md:pb-20">
              <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">All Knowledge Counts</h2>
              <div className="max-w-3xl mx-auto">
                <h4 className="h4   bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 ">Someone out there is searching for the exact thing you know. Don’t keep them waiting.</h4>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute h-full top-4 left-[2px] w-0.5 bg-slate-800 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_150px,theme(colors.white))] -z-10 overflow-hidden after:absolute after:h-4 after:top-0 after:-translate-y-full after:left-0 after:w-0.5 after:bg-[linear-gradient(180deg,_transparent,_theme(colors.blue.500/.65)_25%,_theme(colors.blue.200)_50%,_theme(colors.blue.500/.65)_75%,_transparent)] after:animate-shine" aria-hidden="true"></div>
                {allUpdates.map((post, postIndex) => (
                  <PostItem key={postIndex} {...post} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {/* <div className="max-w-3xl mx-auto">
              <ul className="flex items-center justify-between mt-12 pl-8 md:pl-48">
                <li>
                  <span className="btn-sm text-slate-700 transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none cursor-not-allowed">
                    <span className="relative inline-flex items-center">
                      <span className="tracking-normal text-slate-700 mr-1">&lt;-</span> Previous Page
                    </span>
                  </span>
                </li>
                <li>
                  <a className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="#0">
                    <span className="relative inline-flex items-center">
                      Next Page <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out mx-1">-&gt;</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div> */}

          </div>
        </div>

      </section>

      <Cta />
    </>
  )
}

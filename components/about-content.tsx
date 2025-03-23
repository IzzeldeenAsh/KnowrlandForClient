import Image from 'next/image'
import Particles from './particles'
import Link from 'next/link'

export default function AboutContent() {
  return (
    <section className="relative pt-20 border-bottom-[1px] border-slate-800 border">
      {/* Radial gradient */}
      <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-50"></div>
      </div>

      {/* Particles animation */}
      <Particles className="absolute inset-0 h-96 -z-10" quantity={8} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">About Knoldg</h2>
            <p className="text-lg text-slate-400">Where Knowledge Meets Opportunity</p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="text-slate-400 space-y-6 text-lg">
              <p>
                Knoldg is a pioneering digital platform that provides individuals and businesses with access to high-quality business knowledge, such as data, reports, insights, and manuals across various industries. Our mission is to facilitate seamless knowledge sharing by offering a structured and accessible marketplace for expert-driven content.
              </p>
              <p>
                Whether you're a professional seeking valuable knowledge or an industry expert looking to monetize your expertise, Knoldg is your gateway to trusted insights.
              </p>
              
              <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4">Our Vision</h3>
              <p>
                At Knoldg, we envision a world where expertise is easily accessible, enabling businesses and professionals to make informed decisions with confidence. <strong className="text-slate-50 font-medium">We aim to bridge the gap between knowledge seekers and knowledge creators</strong>, fostering a dynamic ecosystem of learning and growth.
              </p>

              <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4">What We Offer</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 mr-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">Flexible Knowledge Access</strong> – Users can browse and access a variety of knowledge types, including reports, data sets, insights, and manuals. Knowledge files are available for both personal and business use, with some being free and others available for purchase. Additionally, users can buy full reports or specific sections, such as individual chapters or particular datasets, on a pay-as-you-go basis.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 mr-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">Expert Consultation & Inquiries</strong> – Users can connect directly with knowledge experts for additional insights related to a particular uploaded knowledge file. They can also book consultation sessions with experts for deeper discussions and personalized guidance.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 mr-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">AI-Powered Search & Data Structuring</strong> – Knoldg features an advanced AI-supported search engine that enhances discoverability and accessibility of insights, making it easier for users to find relevant information. Our data is structured based on international standards such as ISIC and HS Codes, ensuring seamless integration into global business frameworks.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 mr-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">Monetization for Experts</strong> – Subject matter experts, consultants, and analysts can publish and sell their data, report and insights, earning revenue from their knowledge contributions.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 mr-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">Company & Expert Collaboration</strong> – Experts on Knoldg can be individual professionals or companies. The platform supports company creation, allowing company owners to invite experts—both from within the platform and external professionals—to contribute knowledge, upload insights, and sell data and reports.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-7 h-7 mt-1 mr-3 shrink-0">
                    <svg className="fill-current text-white w-3.5 h-3.5" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 9.5L1.5 5.75L2.5 4.5L5.5 7.25L12.5 1.5L13.5 3L5.5 9.5Z" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-50 font-medium">Global Accessibility</strong> – Serving professionals and businesses worldwide, with a focus on the EU, GCC region, U.S., and Jordan.
                  </div>
                </li>
              </ul>
              
              {/* Who Can Benefit section */}
              <div className="mt-10">
                <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pt-4 pb-3">Who Can Benefit from Knoldg?</h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 mr-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">Businesses & Investors</strong> – Gain access to industry reports, market research, and expert analyses.
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 mr-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">Consultants & Experts</strong> – Share your expertise, grow your audience, and earn from your knowledge.
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 mr-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">Academics & Researchers</strong> – Distribute valuable insights to a wider professional audience.
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex items-center justify-center rounded-full bg-blue-500 w-2 h-2 mt-2.5 mr-3 shrink-0"></div>
                    <div>
                      <strong className="text-slate-50 font-medium">Government & Policy Makers</strong> – Utilize expert insights for informed policymaking and economic development.
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Our Parent Company section */}
              <div className="mt-10 pt-2">
                <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/80 via-slate-200 to-slate-200/80 pb-3">Our Parent Company - A&B Consulting</h3>
                <p className="text-slate-400">
                  Knoldg is proudly owned and operated by A&B Consulting, a firm dedicated to driving business success through strategic insights and sustainable solutions. With a strong foundation in consulting and research, A&B Consulting ensures that Knoldg remains a trusted and professional platform for knowledge exchange.
                </p>
              </div>
              
             
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

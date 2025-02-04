'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Transition } from '@headlessui/react'
import Particles from './particles'

import TestimonialImg01 from '@/public/images/testimonial-01.jpg'
import TestimonialImg02 from '@/public/images/testimonial-02.jpg'
import TestimonialImg03 from '@/public/images/testimonial-03.jpg'

interface Item {
  img: StaticImageData
  quote: string
  name: string
  role: string
}

export default function Testimonials() {

  const [active, setActive] = useState<number>(0)
  const [autorotate, setAutorotate] = useState<boolean>(true)
  const [autorotateTiming] = useState<number>(7000)

  const items: Item[] = [
    {
      img: TestimonialImg01,
      // Original quote (38 words):
      // "The ability to capture responses is a game-changer. If a user gets tired of the sign up and leaves, that data is still persisted. Additionally, it's great to be able to select between formats.ture responses is a game-changer."
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, mauris quisque elementum.",
      // Original name "Jessie J" (2 words)
      name: "Lorem Ipsum",
      // Original role "Ltd Head of Product" (4 words)
      role: "Lorem ipsum dolor sit"
    },
    {
      img: TestimonialImg02,
      // Original quote (36 words):
      // "I have been using this product for a few weeks now and I am blown away by the results. My skin looks visibly brighter and smoother, and I have received so many compliments on my complexion."
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim, metus in finibus pretium, neque sapien commodo arcu, a aliquet orci magna vitae justo. Sed vitae urna in risus mollis Fusce interdum orci sed risus finibus.",
      // Original name "Mark Luk" (2 words)
      name: "Dolor Sit",
      // Original role "Spark Founder & CEO" (4 words)
      role: "Dolor sit amet elit"
    },
    {
      img: TestimonialImg03,
      // Original quote (38 words):
      // "As a busy professional, I don't have a lot of time to devote to working out. But with this fitness program, I have seen amazing results in just a few short weeks. The workouts are efficient and effective."
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet, magna eget fermentum cursus, justo neque sagittis ligula, eget ultrices justo ante sed mauris. Praesent id ligula in metus volutpat semper. Curabitur ac elit in diam ultricies amet.",
      // Original name "Jeff Kahl" (2 words)
      name: "Amet Consectetur",
      // Original role "Appy Product Lead" (3 words)
      role: "Consectetur adipiscing elit"
    }
  ]

  const testimonials = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autorotate) return
    const interval = setInterval(() => {
      setActive(active + 1 === items.length ? 0 : active => active + 1)
    }, autorotateTiming)
    return () => clearInterval(interval)
  }, [active, autorotate])

  const heightFix = () => {
    if (testimonials.current && testimonials.current.parentElement)
      testimonials.current.parentElement.style.height = `${testimonials.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative pb-12 md:pb-20">

          {/* Particles animation */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-6">
            <Particles className="absolute inset-0 -z-10" quantity={10} staticity={40} />
          </div>

          {/* Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_40%,theme(colors.white))]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-slate-400/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-slate-900 after:m-px before:-z-20 after:-z-20">

                {items.map((item, index) => (
                  <Transition
                    key={index}
                    as="div"
                    show={active === index}
                    className={`absolute inset-0 h-full -z-10 transform transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] data-[closed]:absolute data-[enter]:data-[closed]:-rotate-[60deg] data-[leave]:data-[closed]:rotate-[60deg] data-[closed]:opacity-0 data-[enter]:duration-700 data-[leave]:duration-300`}
                    unmount={false}
                    appear={true}
                  >
                    <Image className="relative top-11 left-1/2 -translate-x-1/2 rounded-full" src={item.img} width={56} height={56} alt={item.name} />
                  </Transition>
                ))}

              </div>
            </div>
            {/* Text */}
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out">
              <div className="relative flex flex-col" ref={testimonials}>

                {items.map((item, index) => (
                  <Transition
                    key={index}
                    as="div"
                    show={active === index}
                    className={`transform transition ease-out data-[closed]:absolute data-[enter]:data-[closed]:-translate-x-4 data-[leave]:data-[closed]:translate-x-4 data-[closed]:opacity-0 data-[enter]:duration-500 data-[enter]:delay-200 data-[leave]:duration-300 data-[leave]:delay-200`}
                    unmount={false}
                    appear={true}
                  >
                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">{item.quote}</div>
                  </Transition>
                ))}

              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5">

              {items.map((item, index) => (
                <button
                  className={`btn-sm m-1.5 text-xs py-1.5 text-slate-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none ${active === index ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                  key={index}
                  onClick={() => {
                    setActive(index)
                    setAutorotate(false)
                  }}
                >
                  <span className="relative">
                    <span className="text-slate-50">{item.name}</span> <span className="text-slate-600">-</span> <span>{item.role}</span>
                  </span>
                </button>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

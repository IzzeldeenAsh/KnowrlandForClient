import Link from 'next/link'
import Image from 'next/image'

// Blog post preview component
function BlogPostPreview({ title, excerpt, image, date, slug }: {
  title: string
  excerpt: string
  image: string
  date: string
  slug: string
}) {
  return (
    <article className="h-full flex flex-col bg-gradient-to-tr from-slate-800 to-slate-800/25 rounded-3xl border border-slate-800 hover:border-sky-500/50 transition-colors duration-300">
      <Link className="block" href={`/blog/${slug}`}>
        <figure className="relative h-0 pb-[56.25%] overflow-hidden rounded-t-3xl">
          <Image 
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" 
            src={image} 
            width={600} 
            height={400} 
            alt={title} 
          />
        </figure>
      </Link>
      <div className="flex-grow flex flex-col p-6">
        <div className="mb-3">
          <div className="text-xs text-slate-500">{date}</div>
        </div>
        <Link className="block mb-4" href={`/blog/${slug}`}>
          <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">{title}</h3>
        </Link>
        <div className="text-slate-400 grow mb-5">{excerpt}</div>
        <div>
          <Link className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/70 before:rounded-full before:pointer-events-none" href={`/blog/${slug}`}>
            <span className="relative inline-flex items-center">
              Read More <span className="tracking-normal text-sky-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function BlogList() {
  // Sample blog posts data - in a real application, this would come from a database or API
  const blogPosts = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      excerpt: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      image: "/images/blog-post-01.jpg",
      date: "June 15, 2025",
      slug: "lorem-ipsum-dolor-sit-amet"
    },
    {
      title: "Sed Ut Perspiciatis Unde Omnis",
      excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      image: "/images/blog-post-01.jpg",
      date: "June 1, 2025",
      slug: "sed-ut-perspiciatis-unde-omnis"
    },
    {
      title: "At Vero Eos Et Accusamus",
      excerpt: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
      image: "/images/blog-post-01.jpg",
      date: "May 20, 2025",
      slug: "at-vero-eos-et-accusamus"
    },
  ]

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 mb-8">
            {blogPosts.map((post, index) => (
              <BlogPostPreview key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

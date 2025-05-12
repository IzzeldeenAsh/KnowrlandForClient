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
    <article className="h-full flex flex-row bg-gradient-to-tr from-slate-800 to-slate-800/25 rounded-3xl border border-slate-800 hover:border-sky-500/50 transition-colors duration-300">
      <Link className="block w-[40%] flex-shrink-0" href={`/blog/${slug}`}>
        <figure className="relative h-full overflow-hidden rounded-l-3xl">
          <Image 
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" 
            src={image} 
            width={600} 
            height={400} 
            alt={title} 
            style={{ height: '100%' }}
          />
        </figure>
      </Link>
      <div className="flex-grow flex flex-col p-6 w-[60%]">
        <div className="mb-2">
          <div className="text-xs text-slate-500">{date}</div>
        </div>
        <Link className="block mb-2" href={`/blog/${slug}`}>
          <h3 className="h4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">{title}</h3>
        </Link>
        <div className="text-slate-400 grow mb-4 line-clamp-2">{excerpt}</div>
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
      title: "Data - The Most Valuable Asset in Business",
      excerpt: "In Today’s Rapidly Evolving Digital Economy, Data Has Become a Cornerstone of Business Success.",
      image: "/images/blog-post-01.jpg",
      date: "June 15, 2025",
      slug: "data-the-most-valuable-asset-in-business"
    }

  ]

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-60">
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="h-[240px] w-full">
                <BlogPostPreview {...post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

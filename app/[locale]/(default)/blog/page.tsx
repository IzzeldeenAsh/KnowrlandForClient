import BlogList from "./blog-list"
import BlogSection from "./blog-section"


export const metadata = {
  title: 'Blog - Insighta',
  description: 'Latest insights, news and articles',
}



export default function Blog() {
  return (
    <>
      <BlogSection />
      <BlogList />
    </>
  )
}

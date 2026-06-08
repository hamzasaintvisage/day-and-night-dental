import { posts } from '../data/blog'
import ArticleLayout from '../components/ArticleLayout'

export default function BlogPost({ slug }) {
  const post = posts.find((p) => p.slug === slug)
  if (!post) return null
  return <ArticleLayout post={post} />
}

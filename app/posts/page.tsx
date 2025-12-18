import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types'

export const metadata = {
  title: 'All Posts - Tech Insights Blog',
  description: 'Browse all blog posts about technology, development, and design',
}

export const revalidate = 60

export default async function PostsPage() {
  const posts = await getAllPosts() as Post[]

  return (
    <div className="py-16 container-custom">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">All Posts</h1>
        <p className="text-xl text-gray-600">
          Explore our collection of articles about technology and development
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No posts available yet</p>
          <p className="text-gray-400">Check back soon for new content!</p>
        </div>
      )}
    </div>
  )
}
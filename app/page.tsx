import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'
import type { Post, Category } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getAllPosts() as Post[]
  const categories = await getAllCategories() as Category[]
  
  const featuredPosts = posts.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Tech Insights Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Exploring the latest in web development, design, and technology trends
            </p>
            <Link
              href="/posts"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explore All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Link
            href="/posts"
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All →
          </Link>
        </div>
        
        {featuredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No posts available yet. Check back soon!
          </p>
        )}
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <Link
              href="/categories"
              className="text-primary hover:text-primary/80 font-medium"
            >
              View All →
            </Link>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No categories available yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
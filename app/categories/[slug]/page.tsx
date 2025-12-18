// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import type { Category, Post } from '@/types'

export async function generateStaticParams() {
  const categories = await getAllCategories() as Category[]
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Tech Insights Blog`,
    description: category.metadata?.description || `Posts about ${category.title}`,
  }
}

export const revalidate = 60

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]
  const categoryImage = category.metadata?.category_image
  const description = category.metadata?.description

  return (
    <div className="py-16 container-custom">
      {/* Category Header */}
      <div className="max-w-4xl mx-auto mb-16">
        {categoryImage && (
          <img
            src={`${categoryImage.imgix_url}?w=1600&h=400&fit=crop&auto=format,compress`}
            alt={category.title}
            width={800}
            height={200}
            className="w-full h-auto rounded-lg shadow-lg mb-8"
          />
        )}
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {category.title}
        </h1>
        
        {description && (
          <p className="text-xl text-gray-600">
            {description}
          </p>
        )}
      </div>

      {/* Category Posts */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          Posts in {category.title}
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No posts in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'
import type { Category } from '@/types'

export const metadata = {
  title: 'Categories - Tech Insights Blog',
  description: 'Browse blog posts by category',
}

export const revalidate = 60

export default async function CategoriesPage() {
  const categories = await getAllCategories() as Category[]

  return (
    <div className="py-16 container-custom">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Categories</h1>
        <p className="text-xl text-gray-600">
          Browse posts by topic
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No categories available yet</p>
        </div>
      )}
    </div>
  )
}
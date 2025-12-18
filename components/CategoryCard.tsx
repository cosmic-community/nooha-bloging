import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const categoryImage = category.metadata?.category_image
  const description = category.metadata?.description

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {categoryImage && (
        <img
          src={`${categoryImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
          alt={category.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
        {description && (
          <p className="text-gray-600 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}
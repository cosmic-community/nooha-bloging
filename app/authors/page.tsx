import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import type { Author } from '@/types'

export const metadata = {
  title: 'Authors - Tech Insights Blog',
  description: 'Meet our talented writers and contributors',
}

export const revalidate = 60

export default async function AuthorsPage() {
  const authors = await getAllAuthors() as Author[]

  return (
    <div className="py-16 container-custom">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Authors</h1>
        <p className="text-xl text-gray-600">
          Meet the talented writers behind our content
        </p>
      </div>

      {authors.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No authors available yet</p>
        </div>
      )}
    </div>
  )
}
import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const profilePhoto = author.metadata?.profile_photo
  const bio = author.metadata?.bio

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.title}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{author.title}</h3>
          {bio && (
            <p className="text-gray-600 line-clamp-3">{bio}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
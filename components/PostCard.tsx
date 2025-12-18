import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = post.metadata?.excerpt
  const category = post.metadata?.category
  const author = post.metadata?.author
  const publishedDate = post.metadata?.published_date

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage && (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
      </Link>
      
      <div className="p-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-3 hover:bg-gray-200 transition-colors"
          >
            {category.title}
          </Link>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-primary"
            >
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{author.title}</span>
            </Link>
          )}
          {publishedDate && (
            <time>
              {new Date(publishedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}
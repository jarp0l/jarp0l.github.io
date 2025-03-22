import Link from "next/link";
import { blogSource } from "@/lib/source";

export default async function BlogPosts() {
  const posts = blogSource.getPages();

  return (
    <div className="mx-auto">
      <ul className="pl-0">
        {posts
          .filter((post) => post.slugs.length > 0) // Skip posts where slugs is an empty array
          .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()) // Sort by date
          .map((post, index) => (
            <li key={index} className="flex items-center">
              <time
                className="font-mono tabular-nums whitespace-nowrap pr-2"
                dateTime={new Date(post.data.date).toISOString().slice(0, 10)}
              >
                {new Date(post.data.date).toISOString().slice(0, 10)}
              </time>
              {" — "}
              <Link
                className="font-normal no-underline hover:underline truncate pl-2"
                href={post.url}
                title={post.data.title}
                passHref
              >
                {post.data.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

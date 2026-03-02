import { posts } from "@/lib/blog-posts";
import Link from "next/link";

export default function BlogPage() {
    const postEntries = Object.values(posts);

    return (
        <div className="bg-white px-6 pt-24 pb-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Blog de la lecture durant votre vol</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Analyses, guides et réflexions sur l'assurance, la gestion de risques et la technologie. Le tout, en format rapide à consommer.
                </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {postEntries.map((post) => (
                    <article key={post.slug} className="flex flex-col items-start justify-between">
                        <div className="relative w-full">
                            <img
                                src={post.imageUrl}
                                alt=""
                                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                            />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="max-w-xl">
                            <div className="mt-8 flex items-center gap-x-4 text-xs">
                                <time dateTime={post.date} className="text-gray-500">
                                    {post.date}
                                </time>
                                <span
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
                                >
                                    {post.category}
                                </span>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={`/blog/${post.slug}`}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

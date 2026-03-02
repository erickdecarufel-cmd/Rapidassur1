import { getPostData } from "@/lib/blog-posts";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostData(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <p className="text-base font-semibold leading-7 text-accent">{post.category}</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{post.title}</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">{post.description}</p>
                    <div className="mt-6 flex items-center justify-center gap-x-4 text-xs text-gray-500">
                        <time dateTime={post.date}>{post.date}</time>
                    </div>
                </div>
                <div 
                    className="prose lg:prose-xl mx-auto mt-16"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
}

import { getPostData } from '@/lib/blog-posts';
import { BlogPostClientPage } from '../[slug]/blog-post-client-page';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const slug = 'assurance-cyber-risques-loi-25-quebec';
    const post = getPostData(slug);

    if (post) {
        return {
            title: post.title,
            description: post.description,
            keywords: post.keywords || [],
            openGraph: {
                title: post.title,
                description: post.description,
                images: [
                    {
                        url: post.imageUrl || `https://picsum.photos/seed/${post.slug}/1200/630`,
                        width: 1200,
                        height: 630,
                        alt: `Illustration pour l\'article : ${post.title}`,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.description,
                images: [post.imageUrl || `https://picsum.photos/seed/${post.slug}/1200/630`],
            },
        }
    }

    return {
        title: 'Article non trouvé',
    }
}

export default function SpecificBlogPage() {
    const slug = 'assurance-cyber-risques-loi-25-quebec';
    const post = getPostData(slug);

    return <BlogPostClientPage slug={slug} post={post} />;
}

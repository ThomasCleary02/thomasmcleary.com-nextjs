export interface Blog {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    thumbnail_url: string;
    body: string;
    excerpt?: string;
    published_at?: string;
    created_at: string;
    updated_at: string;
    status: 'draft' | 'published';
    tags?: string[];
}

export interface CreateBlogRequest {
    title: string;
    subtitle?: string;
    slug?: string;
    thumbnail_url: string;
    body: string;
    status?: 'draft' | 'published';
    tags?: string[];
    published_at?: string; // Add this optional field
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
    id: string;
}
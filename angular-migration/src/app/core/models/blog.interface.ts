export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly content: string; // Markdown content
  readonly author: string;
  readonly publishedDate: string; // ISO date string
  readonly tags: readonly string[];
  readonly coverImage?: string;
  readonly readTime?: number; // in minutes
  readonly slug: string;
}

export interface BlogPostsResponse {
  readonly posts: readonly BlogPost[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}

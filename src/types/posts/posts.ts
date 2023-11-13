export type PaginatedResponse<T> = {
	elements: T[],
	lastPage: boolean
}

export type PostTag = {
	id: string;
	name: string;
}

export type PostData = {
	id: string;
	title: string;
	content: string;
	creatorHash: string;
	dateCreated: string;
	likes: number;
	views: number;
	commentsCount: number;
	tags: PostTag[];
}

export type CreatePostTypes = {
	topicId: string;
	title: string;
	content: string;
}

export type SearchOption = Record<"value" | "label", string> & Record<string, string>

export type GetPostsFilterParamsType = {
	pageNum: number,
	title: string,
	topicId: string,
	sortBy: string
}
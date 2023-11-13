import axios from "axios";
import {CreatePostTypes, GetPostsFilterParamsType, PaginatedResponse, PostData} from "@/src/types/posts/posts";
import {buildUrlSearchParams} from "@/src/utils/helpers";
import {cache} from "react";

export const url = 'http://localhost:8080';

export async function handleCreatingPost({topicId, title, content}: CreatePostTypes) {
	const response = await fetch(`${url}/posts`, {
		method: 'POST',
		body: JSON.stringify({title, content, topicId})
	});

	return response.json();
}

// we need the cache here to avoid fetching multiple times the same query if needed in different components
export const getPosts = cache(async ({
																			 pageNum,
																			 title,
																			 topicId,
																			 sortBy
																		 }: Partial<GetPostsFilterParamsType> = {}): Promise<PaginatedResponse<PostData>> => {
	let urlWithSearchParams = `${url}/posts?`;

	const urlArr = [
		{'page': pageNum?.toString()},
		{'title': title},
		{'topicId': topicId},
		{'sortBy': sortBy}
	];
	urlWithSearchParams = buildUrlSearchParams(urlWithSearchParams, urlArr);

	const res = await axios.get(urlWithSearchParams);

	return res.data;
})
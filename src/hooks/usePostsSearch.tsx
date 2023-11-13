'use client'

import {useEffect, useState} from "react"
import {PaginatedResponse, PostData} from "@/src/types/posts/posts";
import {useQuery} from "@tanstack/react-query";
import {getPosts} from "@/src/api/posts";
import getQueryClient from "@/src/app/providers/getQueryClient";

export default function usePostsSearch(pageNumber: number, elements: PostData[], lastPage: boolean = false): PaginatedResponse<PostData> {
	const [paginatedResponse, setPaginatedResponse] = useState<PaginatedResponse<PostData>>({
		elements,
		lastPage
	})

	const {data: postsData, refetch} = useQuery({
		queryKey: ['getPosts', pageNumber],
		queryFn: () => getPosts({pageNum: pageNumber}),
		enabled: false,
	});

	// we fetch the query on the server, and we do not need to fetch again when page is 1
	useEffect(() => {
		if (pageNumber > 1) {
			refetch();
		}
	}, [pageNumber]);

	useEffect(() => {
		if (pageNumber > 1 && !!postsData) {
			setPaginatedResponse(previousResponse => {
				return {
					elements: [...previousResponse.elements, ...postsData.elements],
					lastPage: postsData.lastPage
				}
			})
		}
	}, [postsData])

	return paginatedResponse
}
'use client'

import {useRef, useCallback, useState} from "react";

import {calculateElapsedTimed} from "@/src/utils/helpers";
import usePostsSearch from "@/src/hooks/usePostsSearch";
import PostCard from "@/src/components/Posts/PostCard"
import {PaginatedResponse, PostData} from "@/src/types/posts/posts";

import "../../assets/post/post.css"
import CreatePostBtn from "@/src/components/CreatePost/CreatePostBtn";
import HomeFilter from "@/src/components/Home/HomeFilter";

const Home = ({elements: el, lastPage: lPage}: PaginatedResponse<PostData>) => {
	const [pageNumber, setPageNumber] = useState(1)
	const {elements, lastPage} = usePostsSearch(pageNumber, el, lPage)

	const intObserver = useRef<IntersectionObserver | null>(null)

	const lastPostRef = useCallback((post: any) => {
		if (intObserver.current) {
			intObserver.current.disconnect()
		}

		intObserver.current = new IntersectionObserver(posts => {
			if (posts[0].isIntersecting && !lastPage) {
				setPageNumber(prev => prev + 1)
			}
		})

		if (post) {
			intObserver.current.observe(post)
		}

	}, [lastPage])

	return (
		<div>
			<div className="mx-auto post-container flex flex-col mt-20">
				<CreatePostBtn />

				<HomeFilter />

				{
					elements.map((post, index) => {
						const elapsedTime = calculateElapsedTimed(new Date(post.dateCreated).getTime())
						if (elements.length === (index + 1)) {
							return <PostCard ref={lastPostRef} {...post} dateCreated={elapsedTime} key={index}/>
						}

						return <PostCard {...post} dateCreated={elapsedTime} key={index}/>
					})
				}
			</div>
		</div>
	)
}

export default Home
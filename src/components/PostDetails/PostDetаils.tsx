'use client'

import {useMemo} from "react";
import {calculateElapsedTimed} from "../../utils/helpers";
import {CommentData} from "@/src/components/PostDetails/Comments/Comment";
import Editor from "../../components/Editor/Editor";
import {PostTag} from "@/src/types/posts/posts";
import CommentList from "@/src/components/PostDetails/Comments/CommentList";
import {useBoundStore} from "@/src/store/store";
import PostContent from "@/src/components/Posts/PostContent/PostContent";

export type PostWithComments = {
	id: string;
	title: string;
	content: string;
	creatorHash: string;
	dateCreated: string;
	likes: number;
	views: number;
	comments: CommentData[];
	tags: PostTag[];
}

const postData: PostWithComments = {
	id: 'yLA6m0o',
	title: 'Party care herself.',
	content: 'Them till those who whose indoors bag whomever to steak that with why therefore hers Darwinian ourselves down few weather poverty how place inadequately because swing purse abroad in none furthermore yearly themselves totally half ourselves truth example me of.',
	likes: 9,
	views: 325,
	dateCreated: '2023-09-07T05:22:37.767109+03:00',
	creatorHash: '57180f23e7e8c062ec1db3cf549acc3b5462eec9ed9abb7208934f51d47a7a69',
	tags: [
		{id: 'q4GlvA8', name: 'щастие'},
		{id: 'gB0NV05', name: 'надежда'},
		{id: 'yLA6m0o', name: 'любов'}
	],
	comments: [
		{
			id: 'a',
			content: 'We over troubling who words that wave yours simply pleasant till most pause German time unless read here Californian what which monthly doctor play beat.',
			likes: -35,
			creatorNumber: 3,
			dateCreated: '2023-09-07T19:28:15.542782+03:00',
			creatorHash: '598d2e74a82fd4fe85243d4e8786cda0660b36f7fe32769fa5e06d3660039e40',
			parentId: null
		},
		{
			id: 'b',
			content: 'We over troubli ead here Californian what which monthly doctor play beat.',
			likes: 10,
			creatorNumber: 3,
			dateCreated: '2023-09-07T19:28:15.542782+03:00',
			creatorHash: '598d2e74a82fd4fe85243d4e8786cda0660b36f7fe32769fa5e06d3660039e40',
			parentId: null
		},
		{
			id: 'c',
			content: 'дасдасдасдасдасд',
			likes: 3,
			creatorNumber: 3,
			dateCreated: '2023-09-07T19:28:15.542782+03:00',
			creatorHash: '598d2e74a82fd4fe85243d4e8786cda0660b36f7fe32769fa5e06d3660039e40',
			parentId: 'a'
		},
		{
			id: 'd',
			content: 'We over troubling who words that wave yours simply pleasant till most pause German time unless read here Californian what which monthly doctor play beat.',
			likes: 23,
			creatorNumber: 3,
			dateCreated: '2023-09-07T19:28:15.542782+03:00',
			creatorHash: '598d2e74a82fd4fe85243d4e8786cda0660b36f7fe32769fa5e06d3660039e40',
			parentId: 'a'
		},
		{
			id: 'e',
			content: 'We over troubling who words that wave yours simply pleasant till most pause German time unless read here Californian what which monthly doctor play beat.',
			likes: 1232,
			creatorNumber: 3,
			dateCreated: '2023-09-07T19:28:15.542782+03:00',
			creatorHash: '598d2e74a82fd4fe85243d4e8786cda0660b36f7fe32769fa5e06d3660039e40',
			parentId: 'd'
		}
	]
}

// const PostDetails = ({postData}: {postData: PostWithComments}) => {

const PostDetails = () => {
	const {updateCommentsByParent} = useBoundStore();
	const elapsedTime = calculateElapsedTimed(new Date(postData.dateCreated).getTime());

	const commentsByParent: { [key: string]: CommentData[] } = useMemo(() => {
		const group: { [key: string]: CommentData[] } = {}
		postData.comments.forEach((comment) => {
			group[comment.parentId as string] ||= [];
			group[comment.parentId as string].push(comment);
		});

		updateCommentsByParent(group);
		return group;

	}, [postData.comments])

	return (
		<div className="mx-auto post-container flex flex-col mt-5">
			<div className="post w-full rounded-lg mt-3">
				<PostContent postData={postData} elapsedTime={elapsedTime} isFrom="detail" />

				<div className="ml-8 ms-14">
					<Editor/>
				</div>

				<CommentList comments={commentsByParent['null']}/>
			</div>
		</div>

	)
}

export default PostDetails
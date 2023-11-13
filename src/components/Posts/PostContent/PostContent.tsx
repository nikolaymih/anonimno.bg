import React from 'react';
import PostCardHeader from "@/src/components/Posts/PostContent/PostCardHeader";
import PostCardFooter from "@/src/components/Posts/PostContent/PostCardFooter";
import {PostWithComments} from "@/src/components/PostDetails/PostDetаils";
import Likes from "@/src/components/Likes/Likes";
import {useRouter} from "next/navigation";
import {PostData} from "@/src/types/posts/posts";
import useFadeLabelText from "@/src/hooks/useFadeLabelText";

type PostContent = {
	postData: PostWithComments | PostData
	elapsedTime: string
	isFrom: 'main' | 'detail'
}

const PostContent = ({postData, elapsedTime, isFrom}: PostContent) => {
	const router = useRouter();
	const {parsedText, fadedText} = useFadeLabelText(postData.content)

	const handlePostDetailsNav = (postId: string) => {
		const uri = "posts/" + postId;
		router.push(uri);
	}

	return (
		<section
			className={`flex rounded-lg ${isFrom === 'main' && 'cursor-pointer'}`}
			onClick={() => isFrom === 'main' && handlePostDetailsNav(postData.id)}
		>
			<div className={`w-12 px-3 pt-2 ${isFrom === 'main' && 'bg-gray-100'}`}>
				<Likes likes={postData.likes}/>
			</div>
			<div className="px-2 mt-1">
				<PostCardHeader title={postData.title} views={postData.views} dateCreated={elapsedTime}/>

				<div className="my-3">
					<span>{parsedText}</span>
					{fadedText && <span
						className="bg-gradient-to-r from-gray-900 to-gray-200 text-transparent bg-clip-text">{fadedText}</span>}
				</div>

				<PostCardFooter
					commentsLength={(postData as PostData)?.commentsCount || (postData as PostWithComments)?.comments?.length}
					postId={postData.id}
					disabled={!!(postData as PostWithComments)?.comments}
					onCommentsClick={(postId) => handlePostDetailsNav(postId)}
				/>
			</div>
		</section>
	);
};

export default PostContent;
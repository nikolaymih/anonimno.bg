import {forwardRef} from "react";
import {PostData} from "@/src/types/posts/posts";
import PostContent from "@/src/components/Posts/PostContent/PostContent";

const PostCard = forwardRef<HTMLDivElement, PostData>((postData: PostData, ref) => {
	return (
		<div ref={ref ? ref : null} className={`post w-full ${ref ? 'mt-1.5' : 'mt-3'}`}>
			<PostContent postData={postData} elapsedTime={postData.dateCreated} isFrom="main" />
		</div>
	)
})

export default PostCard
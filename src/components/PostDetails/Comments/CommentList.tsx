import React from 'react';
import Comment, {CommentData} from "@/src/components/PostDetails/Comments/Comment";

const CommentList = ({comments}: { comments: CommentData[] }) => {
	return (
		<div>
			{comments ? comments.map(comment => <Comment key={comment.id} {...comment}/>) : null}
		</div>
	);
};

export default CommentList;
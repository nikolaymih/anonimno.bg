import {useBoundStore} from "@/src/store/store";
import CommentList from "@/src/components/PostDetails/Comments/CommentList";
import {useMemo, useState} from "react";
import {Button} from "@/src/components/ui/button";
import CommentDetails from "@/src/components/PostDetails/Comments/CommentDetails";
import Editor from "@/src/components/Editor/Editor";

export declare interface CommentData {
	id: string;
	content: string;
	likes: number;
	creatorNumber: number;
	dateCreated: string;
	creatorHash: string;
	parentId: string | null
}

const Comment = (comment: CommentData) => {
	const [areChildrenHidden, setAreChildrenHidden] = useState(false)
	const [activeRepliesIds, setActiveRepliesIds] = useState<string[]>()

	const {getReplies} = useBoundStore();
	const childComments = useMemo(() => {
		return getReplies(comment.id);
	}, [])

	//handlers
	const handleSettingActiveTextArea = (commentId: string) => {
		setActiveRepliesIds((prevState) => {
			if (prevState && prevState.includes(commentId)) {
				return prevState.filter((id) => id != commentId);
			}
			return prevState ? [...prevState, commentId] : [commentId];
		})
	}

	const handleRenderingReplies = () => {
		return activeRepliesIds?.includes(comment.id) &&
			<div className="ml-2.5 mt-2.5">
				<Editor/>
			</div>
	}

	return (
		<div className="flex flex-row mr-4 mt-8 w-full ps-2">
			<>
				<div className={`text-xl font-bold relative left-2 ${areChildrenHidden && 'mr-1'}`}>
					{comment.creatorNumber}
				</div>
				<div
					className={`nested-comments-stack ${
						areChildrenHidden ? "hide" : ""
					}`}
				>
					<button
						className="collapse-line"
						aria-label="Hide Replies"
						onClick={() => setAreChildrenHidden(true)}
					/>
				</div>
			</>
			<article className="w-full">
				{
					!areChildrenHidden ? (
							<CommentDetails comment={comment}
											handleSettingActiveTextArea={(commentId) => handleSettingActiveTextArea(commentId)}
							/>
						)
						: (
							<Button
								className={`btn ms-2 ${!areChildrenHidden ? "hide" : ""}`}
								onClick={() => setAreChildrenHidden(false)}
							>
								Покажи
							</Button>
						)
				}

				{
					childComments && childComments?.length > 0
						? (
							<div
								className={`nested-comments-stack ${
									areChildrenHidden ? "hide" : ""
								}`}
							>
								<div className="nested-comments">
									{handleRenderingReplies()}
									<CommentList comments={childComments}/>
								</div>
							</div>
						)
						: handleRenderingReplies()
				}
			</article>
		</div>
	)
}

export default Comment
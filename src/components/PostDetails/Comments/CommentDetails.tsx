import React from 'react';
import {calculateElapsedTimed} from "@/src/utils/helpers";
import {Button} from "@/src/components/ui/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faFlag} from "@fortawesome/free-regular-svg-icons";
import {CommentData} from "@/src/components/PostDetails/Comments/Comment";
import Likes from "@/src/components/Likes/Likes";
import Report from "@/src/components/Report/Report";

type CommentDetailsType = {
	comment: CommentData
	handleSettingActiveTextArea: (commentId: string) => void
}

const CommentDetails = ({comment, handleSettingActiveTextArea}: CommentDetailsType, ) => {
	return (
		<div className="flex rounded-2xl pe-2">
			<div className="pl-3 flex flex-col flex-grow">
				<div className="flex flex-row justify-between">
					<div className="basis-1/3"
						 style={{color: '#8A8A8A', fontSize: '13px', fontStyle: 'italic'}}>
						преди {calculateElapsedTimed(new Date(comment.dateCreated).getTime())}
					</div>
					<div className="basis-1/3 text-right" style={{color: '#8A8A8A', fontSize: '13px'}}>
						hash {comment.creatorHash.slice(0, 10)}
					</div>
				</div>

				<div className="mt-2">
					{comment.content}
				</div>

				<div className="flex mt-3 items-center">
					<Likes likes={comment.likes} />

					<Button className="ms-2 p-1"
							onClick={() => handleSettingActiveTextArea(comment.id)}>
						<FontAwesomeIcon icon={faComment} className="mr-1.5 ms-1"/>
						<span>Коментирай</span>
					</Button>

					<Report />
				</div>
			</div>
		</div>
	);
};

export default CommentDetails;
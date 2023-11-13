"use client";

import React from "react";
import {faComment} from "@fortawesome/free-regular-svg-icons";

import Report from "@/src/components/Report/Report";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "@/src/components/ui/button";

type props = {
	commentsLength: number,
	postId: string,
	disabled: boolean,
	onCommentsClick: (postId: string) => void
}

const PostCardFooter = ({commentsLength, disabled, postId, onCommentsClick}: props) => {
	return (
		<div className="flex flex-col mt-3 mb-1">
			<div className='mr-3 mb-1'>
				<div className='border-t border-gray mx-auto' style={{width: '100%'}}></div>
			</div>

			<div className="flex items-center flex-row mb-2">
				<Button className="pl-0 pr-2" disabled={disabled} onClick={() => onCommentsClick(postId)}>
					<FontAwesomeIcon icon={faComment} className="mr-1.5 ms-1"/>
					<span>{commentsLength ? `${commentsLength} ${commentsLength > 1 ? 'Коментара' : ' Коментар'}` : 'Коментирай'} </span>
				</Button>

				<Report/>
			</div>
		</div>
	)
}

export default PostCardFooter
'use client'

import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import {useQuery} from "@tanstack/react-query";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {getTopics} from "@/src/api/topics";
import {faChevronDown, faList} from "@fortawesome/free-solid-svg-icons";
import {headerTopicLabel} from "@/src/constants";
import {createPostLabel} from "@/src/components/CreatePost/CreatePost";
import {Topic} from "@/src/types/topics";

type ListTopicsType = {
	label: string
	onChange?: (topic: Topic) => void
}
const ListTopics = ({label, onChange}: ListTopicsType) => {
	const [activeTopic, setActiveTopic] = React.useState(label);

	const {data: topicsData} = useQuery({queryKey: ['getTopics'], queryFn: getTopics, enabled: false})

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger
					className="flex justify-between items-center bg-white py-1 px-3 rounded-lg w-44 text-left hover:outline">
					{createPostLabel === activeTopic && <FontAwesomeIcon icon={faList}/>}
					{activeTopic}
					<FontAwesomeIcon icon={faChevronDown}/>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					onClick={(event) => {
						if (onChange) {
							const topic = topicsData?.find(topic => topic.name === (event.target as HTMLElement).innerText)
							topic && onChange && onChange(topic)
						}
							setActiveTopic((event.target as HTMLElement).innerText);
					}}
					className="bg-white rounded-lg shadow"
				>
					{label === headerTopicLabel && (
						<DropdownMenuItem className="cursor-pointer px-3 py-1 hover:bg-blue-100">
							{label}
						</DropdownMenuItem>
					)}
					{
						topicsData?.map((singleTopic) => {
							return (
								<DropdownMenuItem key={singleTopic.id} className="cursor-pointer px-3 py-1 hover:bg-blue-100">
									{singleTopic.name}
								</DropdownMenuItem>
							)
						})
					}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ListTopics;
'use client'

import React from 'react';
import ListTopics from "@/src/components/Topics/ListTopics";
import {headerTopicLabel} from "@/src/constants";
import {useBoundStore} from "@/src/store/store";

const SelectTopic = () => {
	const updateActiveTopic = useBoundStore(state => state.updateActiveTopic)

	return (
		<div>
			<ListTopics label={headerTopicLabel} onChange={(topic) => updateActiveTopic(topic)}/>
		</div>
	);
};

export default SelectTopic;
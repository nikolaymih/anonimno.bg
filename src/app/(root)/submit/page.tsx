import React from 'react';
import CreatePost from "@/src/components/CreatePost/CreatePost";
import getQueryClient from "@/src/app/providers/getQueryClient";
import {dehydrate} from "@tanstack/query-core";
import {Hydrate} from "@tanstack/react-query";
import {getTopics} from "@/src/api/topics";

const Page = async () => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['getTopics'], getTopics);
	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="mt-20 pt-12 m-auto w-2/5">
			<h3 className="pb-4 font-bold border-b border-b-white">
				Създай пост
			</h3>

			<Hydrate state={dehydratedState}>
				<CreatePost/>
			</Hydrate >
		</div>
	);
};

export default Page;
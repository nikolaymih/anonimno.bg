import React from "react";
import Link from "next/link";
import Image from 'next/image'
import {dehydrate} from "@tanstack/query-core";
import {Hydrate} from "@tanstack/react-query";

import logo from '@/src/app/Anonymous_emblem.png';
import getQueryClient from "@/src/app/providers/getQueryClient";
import {getTopics} from "@/src/api/topics";
import SelectTopic from "@/src/components/Topics/SelectTopic";
import Search from "@/src/containers/Home/Search";
import {getPosts} from "@/src/api/posts";

const Header: React.FC = async () => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['getTopics'], getTopics);
	await queryClient.prefetchQuery(['getPosts'], () => getPosts())
	const hydrate = dehydrate(queryClient);

	return (
		<header className="app-header border-b p-2 border shadow-md flex flex-row items-center">
			<div className="flex items-center">
				<div className="flex items-center me-5">
					<Image
						src={logo}
						alt="Picture of the author"
						height={30}
					/>

					<Link href="/">
						<h1 className="text-xl font-bold ms-3">anonimno.bg</h1>
					</Link>
				</div>

				<div className="me-5 ms-5">
					<Hydrate state={hydrate}>
						<SelectTopic/>
					</Hydrate>
				</div>
			</div>

			<Hydrate state={hydrate}>
				<Search/>
			</Hydrate>
		</header>
	)
}

export default Header   
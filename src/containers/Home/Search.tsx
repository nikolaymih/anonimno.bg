'use client'

import React from 'react';
import SearchComponent from "@/src/components/Search/Search";
import {useQuery} from "@tanstack/react-query";
import {getPosts} from "@/src/api/posts";
import {SearchOption} from "@/src/types/posts/posts";
import {useRouter} from "next/navigation";

const Search = () => {
	const [searchValue, setSearchValue] = React.useState<string>('')

	const {data: postsData, isLoading,} = useQuery({
		queryKey: ['getPosts', searchValue],
		queryFn: () => !searchValue ? getPosts() : getPosts({title: searchValue}),
		refetchOnWindowFocus: false
	});
	const router = useRouter();

	const options: SearchOption[] | undefined = React.useMemo(() => {
		return postsData?.elements?.map(({title, views, id, content}) => (
			{label: title, value: id, views: String(views), content}
		))
	}, [postsData])

	return (
		<div>
			<SearchComponent
				options={options}
				emptyMessage="Няма намерени резултати"
				placeholder="Търсене"
				onSelectedValueChange={(option) => router.push(`/posts/${option.value}`)}
				onSearchValueChange={(value) => setSearchValue(value)}
			/>
		</div>
	);
};

export default Search;
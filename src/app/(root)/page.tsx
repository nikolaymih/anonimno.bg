import {PaginatedResponse, PostData} from "@/src/types/posts/posts";
import Home from "@/src/components/Home/Home";
import {getPosts} from "@/src/api/posts";

async function fetchPost(): Promise<PaginatedResponse<PostData>> {
	const url = "http://localhost:8080/posts";
	const response = await fetch(url);
	return response.json();
}

export default async function Page() {
	const {elements, lastPage} = await fetchPost()

	return (
		<section>
			<Home elements={elements} lastPage={lastPage}/>
		</section>
	)
}

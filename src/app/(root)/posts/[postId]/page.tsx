import PostDetails from "@/src/components/PostDetails/PostDetаils";

async function fetchSinglePost(postId: string) {
	const url = "http://localhost:8080/posts/" + postId
	const response = await fetch(url)

	return response.json();
}

const Page = async ({params}: { params: { postId: string } }) => {
	const singlePost = await fetchSinglePost(params.postId as string);

	return (
		<PostDetails />
	)
};

export default Page;
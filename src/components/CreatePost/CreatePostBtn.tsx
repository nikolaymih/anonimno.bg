import React from 'react';
import { Input } from "@/src/components/ui/input"
import {useRouter} from "next/navigation";

const CreatePostBtn = () => {
	const router = useRouter();
	return (
		<div className="mb-3">
			<Input
				onClick={() => router.push('/submit')}
				className="cursor-pointer hover:outline"
				placeholder="Създай пост"
			/>
		</div>
	);
};

export default CreatePostBtn;
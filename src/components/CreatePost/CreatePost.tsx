'use client'

import React from 'react';
import {useForm, SubmitHandler, FieldValues, Controller} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

import {useMutation} from "@tanstack/react-query";
import {Input} from "@/src/components/ui/input";
import Editor from "@/src/components/Editor/Editor";
import {Button} from "@/src/components/ui/button";
import ListTopics from "@/src/components/Topics/ListTopics";
import {useRouter} from "next/navigation";
import {handleCreatingPost} from "@/src/api/posts";

export const createPostLabel = 'Избери тема'

const createPostValidationSchema = yup.object({
	topicId: yup.string().required('Моля, изберете тема.'),
	title: yup.string().required("Моля, изберете заглавие.").min(5, 'Заглавието трябва да е поне 5 символа.').max(1000, 'Максималните допустими символи са 1000.'),
	content: yup.string().required("Моля, добавете текст.").min(10, 'Съдържанието трябва да е поне 10 символа.').max(20000, 'Максималните допусними символи са 20000.')
})

const CreatePost = () => {
	const router = useRouter()
	const {mutateAsync} = useMutation({
		mutationKey: ['createPost'],
		mutationFn: handleCreatingPost,
		onSuccess: ({id}) => router.push(`/posts/${id}`)
	})

	const {
		handleSubmit,
		register,
		control,
		formState: {errors}
	} = useForm({resolver: yupResolver(createPostValidationSchema)})

	return (
		<section className="mt-4">
			<form onSubmit={handleSubmit(mutateAsync as SubmitHandler<FieldValues>)}>
				<article className={`${errors.topicId ? "mb-2" : "mb-4"}`}>
					<Controller
						render={({field}) => (
							<ListTopics label={createPostLabel} onChange={field.onChange} />
						)}
						control={control}
						name="topicId"
						defaultValue=""
					/>
					{errors.topicId && <p className="text-red-500 text-sm mb-5">{errors.topicId.message}</p>}
				</article>

				<article className="bg-white border p-5 rounded-lg">
					<Input
						className={`${errors.title ? "mb-2" : "mb-5"}`}
						placeholder="Заглавие"
						{...register('title', {required: true})}
					/>
					{errors.title && <p className="text-red-500 text-sm mb-5">{errors.title.message}</p>}

					<Controller
						render={({field}) => (
							<Editor
								disableCommentBtn
								onChange={field.onChange}
							/>
						)}
						control={control}
						name="content"
						defaultValue=""
					/>
					{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

					<div className="text-right mt-4">
						<Button
							className="bg-neutral-500 text-white"
							// disabled={!title || !content}
							// onClick={() => mutate()}
							type="submit"
						>
							Създай
						</Button>
					</div>
				</article>
			</form>
		</section>
	);
};

export default CreatePost;
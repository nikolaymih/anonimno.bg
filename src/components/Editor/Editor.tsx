'use client'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Placeholder} from "@tiptap/extension-placeholder";
import {Suspense} from "react";
import Link from "@tiptap/extension-link";

import MenuBar from "./MenuBar"
import {ChangeHandler} from "react-hook-form";

type EditorTypes = {
	disableCommentBtn?: boolean;
	onChange?: any
}

const Editor = ({disableCommentBtn = false, onChange}: EditorTypes) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Link,
			Placeholder.configure({
				placeholder: 'Какво мислиш?',
			}),
		],
		autofocus: true,
		editable: true,
		injectCSS: false,
		editorProps: {
			attributes: {
				class: 'border-2 border-b-0 rounded-t-lg p-2 h-32 overflow-hidden overflow-y-auto',
			},
		},
		onUpdate: ({editor}) => {
			onChange && onChange(editor.getText())
		}
	})

	return (
		<>
			{!editor ? (
					<Suspense>
						<p className="text-center">Loading...</p>
					</Suspense>
				)
				: (
					<>
						<EditorContent placeholder="Какво мислиш" editor={editor}/>

						<div
							className={`bg-gray-200 rounded-b-lg ${editor?.isFocused && 'border  border-t-0 border-black'}`}>
							<MenuBar editor={editor} disableCommentBtn={disableCommentBtn}/>
						</div>
					</>
				)
			}
		</>
	)
}

export default Editor
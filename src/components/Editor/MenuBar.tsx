import {Editor} from '@tiptap/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faBold,
	faItalic, faLink,
	faListOl,
	faListUl,
	faQuoteRight,
	faRotateLeft, faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/src/components/ui/button";

type props = {
	editor: Editor
	disableCommentBtn?: boolean
}

const MenuBar = ({editor, disableCommentBtn = false}: props) => {

	return (
		<section className="flex justify-between">
			<div className="flex items-center">
				<Button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={
						!editor.can()
							.chain()
							.toggleBold()
							.run()
					}
					className={`m-0.5 ${editor.isActive('bold') && 'is-active text-base'}`}
				>
					<FontAwesomeIcon icon={faBold}/>
				</Button>

				<Button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={
						!editor.can()
							.chain()
							.focus()
							.toggleItalic()
							.run()
					}
					className={`${editor.isActive('italic') && 'is-active font-bold'}`}
				>
					<FontAwesomeIcon icon={faItalic}/>
				</Button>

				<Button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}

				>
					<FontAwesomeIcon icon={faListUl}/>
				</Button>

				<Button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`${editor.isActive('orderedList') && 'is-active'}`}
				>
					<FontAwesomeIcon icon={faListOl}/>
				</Button>

				<Button
					onClick={() => editor.chain().focus().toggleLink({href: editor.getText()}).run()}
					className={editor.isActive('codeBlock') ? 'is-active' : ''}
				>
					<FontAwesomeIcon icon={faLink}/>
				</Button>

				<Button onClick={() => editor.chain().focus().undo().run()}>
					<FontAwesomeIcon icon={faRotateLeft}/>
				</Button>

				<Button onClick={() => editor.chain().focus().redo().run()}>
					<FontAwesomeIcon icon={faRotateRight}/>
				</Button>
			</div>

			{!disableCommentBtn && <div className="flex items-center">
				<Button
					onClick={() => editor.chain().focus().run()}
					className="bg-neutral-500 text-white rounded-3xl py-1 px-5 mr-3 h-8"
					disabled={!editor.getText()}
				>
					Коментирай
				</Button>
			</div>
			}
		</section>
	)
}
export default MenuBar
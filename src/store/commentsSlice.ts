import {StateCreator } from 'zustand'
import {CommentData} from "@/src/components/PostDetails/Comments/Comment";

type State = {
	commentsByParent: { [key: string]: CommentData[] }
}

export interface CommentsSlice  {
	commentsByParent: { [key: string]: CommentData[] }
	updateCommentsByParent: (commentsByParent: State['commentsByParent']) => void
	getReplies(parentId: string): CommentData[]
}

export const commentsSlice: StateCreator<CommentsSlice> = ((set, get) => ({
	commentsByParent: {},
	updateCommentsByParent: (commentsByParent) => set({ commentsByParent }),
	getReplies: (parentId) => {
		const comments = get().commentsByParent;
		return comments[parentId];
	}
}));
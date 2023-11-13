import {create} from 'zustand'
import {CommentsSlice, commentsSlice} from "@/src/store/commentsSlice";
import {ActiveTopicSlice, activeTopicSlice} from "@/src/store/activeTopicSlice";

export const useBoundStore = create<CommentsSlice & ActiveTopicSlice>()((...a) => ({
		...commentsSlice(...a),
		...activeTopicSlice(...a)
}))
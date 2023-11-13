import {StateCreator} from "zustand";

interface ActiveTopic {
	id: string
	name: string,
	count: number
}

export interface ActiveTopicSlice {
	activeTopic: ActiveTopic
	updateActiveTopic: (activeTopic: ActiveTopic) => void
	getActiveTopic: () => ActiveTopic
}

export const activeTopicSlice: StateCreator<ActiveTopicSlice> = ((set, get) => ({
	activeTopic: {id: 'all', name: 'Всички', count: 0},
	updateActiveTopic: (activeTopic) => set({activeTopic}),
	getActiveTopic: () => {
		return get().activeTopic;
	}
}))
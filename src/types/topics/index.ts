export type Topic = {
	id: string;
	name: string;
	count: number;
};

export type TopicsType = Topic[];

export type Option = Record<"value" | "label", string> & Record<string, string>
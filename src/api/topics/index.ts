import axios from "axios";
import {TopicsType} from "../../types/topics";

export const getTopics = async (): Promise<TopicsType> => {
	const res = await axios.get('http://localhost:8080/topics');
	return res.data;
}
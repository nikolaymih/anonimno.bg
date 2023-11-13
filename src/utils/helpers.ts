import {array} from "yup";

export function calculateElapsedTimed(date: number): string {
	let message: string = ""

	const dateTimeNow = Date.now()
	const resultMS = dateTimeNow - date

	const resultSeconds = Math.round(resultMS / 1000)
	if (resultSeconds < 60) return resultSeconds + " секунди"

	const resultMinutes = Math.round(resultSeconds / 60)
	if (resultMinutes < 60) return resultMinutes + " минути"

	const resultHours = Math.round(resultMinutes / 60)
	if (resultHours < 24) return resultHours + " часа"

	const resultDays = Math.round(resultHours / 24)
	if (resultDays < 7) return resultDays + " дни"

	const resultWeeks = Math.round(resultDays / 7)
	if (resultWeeks > 0) return resultWeeks + " седмици"

	return "0 секунди"
}


export const findClosestEndOfWord = (text: string, character: number): number => {
	let index = character;

	if (text.length > character) {
		for (let i = character; i < text.length; i++) {
			if (text[i] === " ") {
				index = i;
				break; // Exit the loop when a space is found
			}
		}
	} else {
		for (let i = character; i >= 0; i--) {
			if (text[i] === " ") {
				index = i;
				break; // Exit the loop when a space is found
			}
		}
	}

	return index;
};

export const buildUrlSearchParams = <T extends { toString(): string }>(
	urlWithSearchParams: string,
	arr: { [key: string]: T | undefined }[]
) => {
	for (const obj of arr) {
		if (obj) {
			Object.keys(obj).forEach((key) => {
				let value = obj[key];
				if (value !== undefined) {
					urlWithSearchParams += new URLSearchParams({ [key]: value.toString() }).toString() + '&';
				}
			});
		}
	}

	return urlWithSearchParams.slice(0, -1);
};
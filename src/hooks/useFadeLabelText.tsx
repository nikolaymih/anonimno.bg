import React from 'react';
import {findClosestEndOfWord} from "@/src/utils/helpers";

const useFadeLabelText = (text: string) => {
	const [parsedText, setParsedText] = React.useState<string>('');
	const [fadedText, setFadedText] = React.useState<string>('');
	const parsedTextMaxValue = 400;
	const fadedTextMaxValue = 830;

	React.useMemo(() => {
		if (text.length > parsedTextMaxValue) {
			setParsedText(text.substring(0, parsedTextMaxValue));
			setFadedText(() => {
				if (text.length < fadedTextMaxValue) {
					return text.substring(parsedTextMaxValue + 1, text.length);
				}
				return text.substring(parsedTextMaxValue + 1, findClosestEndOfWord(text, fadedTextMaxValue));
			})

			return;
		}

		setParsedText(text);
	}, [text]);

	return {parsedText, fadedText};
};

export default useFadeLabelText;
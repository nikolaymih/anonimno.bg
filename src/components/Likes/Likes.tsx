import React from 'react';

import {Button} from "@/src/components/ui/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpLong} from "@fortawesome/free-solid-svg-icons";

const Likes = ({likes}: {likes: number}) => {
	return (
		<>
			<Button className="p-1">
				<FontAwesomeIcon icon={faUpLong} size="xl"/>
			</Button>

			<p className="ms-1.5 mr-2 font-bold text-sm text-center">{likes}</p>

			<Button className="p-1">
				<FontAwesomeIcon icon={faUpLong} size="xl" rotation={180}/>
			</Button>
		</>
	);
};

export default Likes;
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag} from "@fortawesome/free-regular-svg-icons";
import {Button} from "@/src/components/ui/button";

const Report = () => {
	return (
		<>
			<Button className="ms-2 p-1">
				<FontAwesomeIcon icon={faFlag} className="mr-1.5"/>
				<span>Докладвай</span>
			</Button>
		</>
	);
};

export default Report;
import React from 'react';
import {Button} from "@/src/components/ui/button";
import {faFireExtinguisher, faNewspaper, faRankingStar, faUsersBetweenLines} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HomeFilter = () => {
	return (
		<section className="flex bg-white text-gray-100 rounded-lg p-0.5">
			<Button className="text-muted-foreground font-bold rounded-3xl">
				<FontAwesomeIcon className="me-1" size="lg" icon={faUsersBetweenLines}/>
				<span>
					Best
				</span>
			</Button>
			<Button className="text-muted-foreground font-bold rounded-3xl">
				<FontAwesomeIcon className="me-1" size="lg" icon={faFireExtinguisher}/>
				<span>
					Hot
				</span>
			</Button>
			<Button className="text-muted-foreground font-bold rounded-3xl">
				<FontAwesomeIcon className="me-1" size="lg" icon={faNewspaper}/>
				<span>
					New
				</span>
			</Button>
			<Button className="text-muted-foreground font-bold rounded-3xl">
				<FontAwesomeIcon className="me-1" size="lg" icon={faRankingStar}/>
				<span>
					Top
				</span>
			</Button>
		</section>
	);
};

export default HomeFilter;
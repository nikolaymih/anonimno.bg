type props = {
	title: string,
	views: number,
	dateCreated: string
}

const PostCardHeader = ({title, views, dateCreated}: props) => {
	return (
		<div className="flex flex-col">
			<div className="text-1xl font-bold">
				<div className="mt-2">
					{title}
				</div>
			</div>
			<div className="flex"
				 style={{color: '#8A8A8A', fontSize: '13px', fontStyle: 'italic'}}>
				<div>
					преглед: {views}
				</div>
				<div className="ml-3">
					преди {dateCreated}
				</div>
			</div>
		</div>
	)
}

export default PostCardHeader
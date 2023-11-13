type props = {
    name: string,
    id: string
}

const Tag = ({id, name}: props) => {
    return <div className="border rounded mr-2 tag"> {name} </div>
}

export default Tag
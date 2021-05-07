import React from 'react'

const Sort = (props) => {
    return (
        <div>
            filter shown with <input value={props.nameFind} onChange={props.handleSearch}/>
        </div>
    )
}

export default Sort
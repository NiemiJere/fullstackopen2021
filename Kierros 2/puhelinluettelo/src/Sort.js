import React from 'react'

const Sort = ({nameFind, handleSearch}) => {
    return (
        <div>
            filter shown with <input value={nameFind} onChange={handleSearch}/>
        </div>
    )
}

export default Sort
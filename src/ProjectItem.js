import React from "react"

function projectItem(props) {
    return (
        <div className="project-item">
            <input type="checkbox"/> title: {props.projectItem.title}<br /> 
            <body>description: {props.projectItem.description}</body>
            <br></br>
            
        </div>
    )
}
export default projectItem
import React from "react"
import projectItem from "./ProjectItem"

function ProjectListPage() {
    projectListCommand = Command(0, {}, 3)  
    const projectItems = projectListCommand.map(item => <projectItem key={item.id} item={item}/>)
    
    return (
        <div className="project-list">
            {projectItems}
        </div>
    )
}

export default ProjectListPage

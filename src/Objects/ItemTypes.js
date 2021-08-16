
export class Item { 
    /**
     * 
     * @param {Contains fields for all of the instance attributes of the Item} item_obj 
     */
    constructor(itemObj) { 
        this.title = itemObj.title;
        this.dateAdded = itemObj.date;
        this.lastAccessed = itemObj.lastAccessed;
        this.description = itemObj.description;
        this.itemId = itemObj.itemId;
        // this is an array of strings 
        this.tags = itemObj.tags;
        // this is an array of key value pairs 
        this.subItems = itemObj.subItems;
    }


}

class Project extends Item{ 
    constructor(itemObj) { 
        super();
        // This is an integer representing the id of the parent
        this.parentProject = itemObj.parentProject;
        // This is an array of ints representing the ids of the child actions
        this.actions = itemObj.actions;
        // This is an array of ints representing the arrays of the child projects
        this.projects = itemObj.projects;
        // This is a datetime object
        this.deadline = itemObj.deadline;
    }
}

class Action extends Item{ 
    constructor(itemObj) { 
        super();
        // This is an integer representing the id of the parent 
        this.parentProject = itemObj.parentProject;
        // This is a datetime object
        this.deadline = itemObj.deadline;
    }

}

class subItems { 
    constructor(characterization, value) { 
        this.characterization = characterization
        this.value = value
    }
}
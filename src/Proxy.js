import {Command} from "./Command"


export  class Proxy {
    constructor(){
        this.user = {'authToken' : 'jjkk'}
        this.backendAPI = 'http://127.0.0.1:8000/api/'
    }
    

    // user = new User()
    

    /**
     * Author: Aleks Neceski
     * accepts a command and parses it based on it's operation parameter
     * 
     * Takes Command 
     * 1) Determines request type 
     * 2) Determines item type
     * 3) Does processing based on detail 
     */
    async processCommand(command) { 
        let type = command.getDetail()

        let resp;

        if (type === 'GET') { 
            resp = await this.databaseGet(command)
        } else if (type === 'POST') { 
            resp = await this.databasePost(command)
        } else if (type === 'DELETE') { 
            resp = await this.databaseGet(command)
        } else if (type === 'PUT') { 
            resp = await this.databaseUpdate(command)
        }

        return resp;

    }

// ====================================================================================
// ====================================================================================
// *****************************    Get Functions   ***********************************
// ====================================================================================
// ====================================================================================

    /**
     * Author: Josh Widman
     * Input: Command Object
     * return: Return command object attribute corresponding to command type 
     */
    async databaseGet(command){
        var type = command.getObject(command) ;
        var ret;

        if (type === 'user'){
            ret = await this.getUser(command);
        } else if (type === "item" ){
            ret = await this.getItem(command);

        } else if (type === "action"){
            ret = await this.getAction(command);
        }
        else if (type === "project"){
            ret = await this.getProject(command);
        }
        else{
            ret = await this.databaseGet()
        }
        return ret;
    };

    /**
     * Author: Aleks Neceski
     * Input: Command Object
     * return: Returns an object with all of the user attributes from the database
     */
    async getUser(command) {
        let url = this.backendAPI
        url = url.concat('user/detail/')
        try { 
            let authToken = this.user.authToken
            
            url = url.concat(`${authToken}/`)
        } catch(err) {
            console.log(err)
        };

        let response = await fetch(url);

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        };

        let user = JSON.parse(response.json());

        return user;
    };

    /**
    * Author: Josh Wimdan, Aleksandar Neceski
    * Input: Command Object
    * return: returns parsed data from item list
    */
    async getItem(command) {
            let object = command.getDetail();
            let url = this.backendAPI;
            url = url.concat('user/detail/');
            let items;
           
            try {
                url = url.concat(`item/detail/${this.user.authToken}/${object.itemId}/`);
            } catch(err){
                url = url.concat(`item/list/${this.user.authToken}/`);
            }
            let response = await fetch(url);
    
            if (!response.ok){
                throw new Error(`HTTP error status: ${response.status}`);
            } else { 
                let items = JSON.parse(response.json());

                for (var item in items) { 
                    // makes async call to this.getTags() to assign the tags array to 
                    // the object['tags']
                    object['tags'] = await this.getTags(item.itemId)

                    // makes async call to this.getTags() to assign the tags array to 
                    // the object['tags']
                    object['subItems'] = await this.getSubItems(item.itemId)
                }  
            }
   
           return items
    };

    /**
     * Author: Josh Wimdan
     * Input: Command Object
     * return: returns parsed data from item list
     */
    async getAction(command) {
        let object = command.getDetail();
        let url = this.backendAPI;
        var action;
        if ('itemId' in object) { 
            if ('category' in object) { 
                let category = object.category
                url = url.concat(`action/list/${this.user.authToken}/${category}/`);
            } else { 
                let itemId = object.itemId
                url = url.concat(`action/detail/${this.user.authToken}/${itemId}/`);
            }
        } else { 
            url = url.concat(`action/list/${this.user.authToken}/`);
        }
        let response = await fetch(url);

        if (!response.ok){
            throw new Error(`HTTP error status: ${response.status}`);
        } else { 
            let items = JSON.parse(response.json());

            for (var item in items) { 
                // makes async call to this.getTags() to assign the tags array to 
                // the object['tags']
                object['tags'] = await this.getTags(item.itemId)

                // makes async call to this.getTags() to assign the tags array to 
                // the object['tags']
                object['subItems'] = await this.getSubItems(item.itemId)
            }  
        }
        
        action = JSON.parse(response.json());

        return action
    };

    /**
     * Author: Josh Wimdan, Aleks Neceski
     * Input: Command Object
     * return: returns parsed data from item list
     */
    async getProject(command) {
        let object = command.getDetail();
        let url = this.backendAPI;
        let projects;
        if ('itemId' in object) { 
            if ('category' in object) { 
                let category = object.category
                url = url.concat(`project/list/${this.user.authToken}/${category}/`);
            } else { 
                let itemId = object.itemId
                url = url.concat(`project/detail/${this.user.authToken}/${itemId}/`);
            }
        } else { 
            url = url.concat(`project/list/${this.user.authToken}/`);
        }
        let response = await fetch(url);

        if (!response.ok){
            throw new Error(`HTTP error status: ${response.status}`);
        } else { 
            projects = JSON.parse(response.json());

            for (var item in projects) { 
                // makes async call to this.getTags() to assign the tags array to 
                // the object['tags']
                item['tags'] = await this.getTags(item.itemId)

                // makes async call to this.getSubItems() to assign the tags array to 
                // the object['tags']
                item['subItems'] = await this.getSubItems(item.itemId)

                // makes async call to this.getProjectChildren() to assign the lists of 
                // Children to the object['actions'] and object['projects']
                item['actions'] = {};
                item['projects'] = {};
                await this.getProjectChildren(item.itemId, item['actions'], item['projects']);
            }  
        }

        return projects;
    };

    /**
     * author Aleks Neceski
     * @param {} itemId 
     * @returns an array with all of the tags associated with the item/action/project that has itemId
     */
    async getTags(itemId) { 
        // creates the URL for the tagList request
        let tagsURL = this.backendApi.concat(`tags/list/${itemId}/`)
        // sends request for all of the tags associated with the item ID and
        // parses the json of the response
        let tagResponse = await fetch(tagsURL);
        let tagsObjects = JSON.parse(tagResponse.json())

        // instantiates tags list for the tags in tagsObjects to be assigned to
        let tags = []
        for (var tag in tagsObjects) { 
            tags.push(tag['tag'])
        }

        return tags
    }

    /**
     * 
     */
    async getProjectChildren(itemId, actions, projects) { 
        // creates the URL for the tagList request
        let childrenURL = this.backendApi.concat(`projectChild/list/${itemId}/`)
        // sends request for all of the tags associated with the item ID and
        // parses the json of the response

        let actionChildrenURL = childrenURL.concat(`action/`)
        let actionResponse = await fetch(actionChildrenURL);
        actions = JSON.parse(actionResponse.json())

        let projectChildrenURL = childrenURL.concat(`action/`)
        let projectResponse = await fetch(projectChildrenURL);
        projects = JSON.parse(projectResponse.json())
    }

    /**
     * 
     * @param {*} itemId 
     * @returns 
     */
    async getSubItems(itemId) { 
        // creates the URL for the subItemsList request
        let subItemsUrl = this.backendApi.concat(`subitem/list/${itemId}/`)
        // sends request for all of the tags associated with the item ID and
        // parses the json of the response
        let subItemResponse = await fetch(subItemsUrl);
        let subItemsObjects = JSON.parse(subItemResponse.json())

        // instantiates tags list for the tags in tagsObjects to be assigned to
        let subItems = {}
        let char, data;
        for (var subItem in subItemsObjects) { 
            char = subItem['characterization'];
            data = subItem['data'];
            subItems[char] = data;
        };

        return subItems;
    }

// ====================================================================================
// ====================================================================================
// *****************************    Post Functions   **********************************
// ====================================================================================
// ====================================================================================

    /**
     * Author: Josh Widman
     * Input: Command Object
     * return: Create new values object for command object type
     */
    async databasePost(command){
        var type = command.getObject(command) ;
        var ret;

        if (type === 'user'){
            ret = await this.postUser(command);
        } else if (type === "item" ){
            ret = await this.postItem(command);

        } else if (type === "action"){
            ret = await this.postAction(command);
        }
        else if (type === "project"){
            ret = await this.postProject(command);
        }
        
        return ret;
    };

    /**
     * Author: Aleks Neceski
     * 
     * Calls the user/create/ api endpoint and passes a json object of a user to the backend API
     * 
     */
    async postUser(command) {
        let object = command.getDetail()
        let url = this.backendAPI
        url = url.concat("user/create/");
        

        let response = await fetch(url, {  
            method: 'POST',
            body: JSON.stringify(object)
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        }

        return
    };

    /**
     * Author: Aleks Neceski
     * 
     */
    async postItem(command) {
        let object = command.getDetail()
        let  url = this.backendAPI

        // Defines the URL to access the item 
        url = url.concat(`item/create/${this.user.authToken}/`);

        // Store tags and subItems information from the object 
        let tags = this.removeTagsFromObject(object)
        let subItems = this.removeSubItemsFromObject(object)

        // Get userId from Backend
        let userIdURL = url.concat(`user/Id/${this.user.authToken}/`)
        let userId = await fetch(userIdURL)

        // Add information to the object: userId
        object['userId'] = userId

        // Make the request to create the Item 
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(object)
        });
        
        // Checks for failed request
        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        // if response is good it enters this block to create tags and subitems if applicable
        } else { 
            this.postTags(tags)
            this.postSubItems(subItems)
        }

        return
    };

    /**
     * 
     * 
     */
    async postAction(command) {
        let object = command.getDetail()
        let url = this.backendAPI

        // Defines the URL to access the item 
        url = url.concat(`action/create/${this.user.authToken}/`);

        // Store tags and subItems information from the object 
        let tags = this.removeTagsFromObject(object)
        let subItems = this.removeSubItemsFromObject(object)

        // Get userId from Backend
        let userIdURL = url.concat(`user/Id/${this.user.authToken}/`)
        let userId = await fetch(userIdURL)

        // Add information to the object: userId
        object['userId'] = userId

        // Make the request to create the Item 
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(object)
        });
        
        // Checks for failed request
        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        // if response is good it enters this block to create tags and subitems if applicable
        } else { 
            this.postTags(tags)
            this.postSubItems(subItems)
        }
        var itemDeleteURL;
        itemDeleteURL = this.backendAPI.concat(`item/delete/${object.itemId}/`)
        await fetch(itemDeleteURL, { 
            method: 'DELETE'
        })

        return
    };

    /**
     * 
     * 
     */
    async postProject(command) {
        let object = command.getDetail()
        let  url = this.backendAPI

        // Defines the URL to access the item 
        url = url.concat(`project/create/${this.user.authToken}/`);

        // Store tags and subItems information from the object 
        let tags = this.removeTagsFromObject(object)
        let subItems = this.removeSubItemsFromObject(object)
        let childActions = this.removeActionsFromObject(object)
        let childProjects = this.removeProjectsFromObject(object)

        // Get userId from Backend
        let userIdURL = url.concat(`user/Id/${this.user.authToken}/`)
        let userId = await fetch(userIdURL)

        // Add information to the object: userId
        object['userId'] = userId

        // Make the request to create the Item 
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(object)
        });
        
        // Checks for failed request
        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        // if response is good it enters this block to create tags and subitems if applicable
        } else { 
            this.postTags(tags)
            this.postSubItems(subItems)
            this.postProjectChildren(object.itemId, childActions, childProjects)
        }
        return

    };

    async postTags(itemId, tags) { 
        if (tags.length != 0){ 
            for (var tag_name in tags){ 
                let tag = {
                    'itemId': itemId, 
                    'tag': tag_name
                }

                await this.postTag(tag)
            }
        }
        
    };

    async postSubItems(itemId, subItems) { 
        if (subItems.length != 0) { 
            for (var char in subItems.keys()) {
                let subItem = { 
                    'itemId': itemId,
                    'characterization': char,
                    'info': subItems[char]
                }

                await this.postSubItem(subItem)
            }
        }
    };

    async postTag(tag) { 
        let url = this.backendAPI.concat(`tags/create/${this.user.authToken}/`)

        await fetch(url, {  
            method: 'GET', 
            body: JSON.stringify(tag)
        })
    };

    async postSubItem(subItem) { 
        let url = this.backendAPI.concat(`tags/create/${this.user.authToken}/`)

        await fetch(url, { 
            method: 'GET', 
            body: JSON.stringify(subItem)
        })
    };

    async postProjectChildren(itemId, actions, projects) { 
        let url = this.backendAPI.concat(`project/create/${this.user.authToken}/`)
        for (const id in actions) { 
            let object = {}
            object['projectId'] = itemId
            object['childId'] = id
            object['type'] = 'action'

            let jsonObject = JSON.stringify(object)
            
            fetch(url, { 
                "method": 'POST', 
                "body": jsonObject
            })
        } 
        for (const id in projects) { 
            let object = {}
            object['projectId'] = itemId
            object['childId'] = id
            object['type'] = 'project'

            let jsonObject = JSON.stringify(object)
            
            fetch(url, { 
                "method": 'POST', 
                "body": jsonObject
            })
        }
    }


    removeTagsFromObject(object) { 
        // Store tags information from the object 
        let tags = object['tags']
        // Pulls out tags from object
        delete object['tags']

        return tags
    }

    removeSubItemsFromObject(object) { 
        // Store subItems information from the object 
        let subItems = object['subItems']
        // Pulls out tags from object
        delete object['subItems']

        return subItems
    }

    removeActionsFromObject(object) { 
        // Store tags and subItems information from the object 
        let actions = object['actions']
        // Pulls out tags from object
        delete object['actions']

        return actions
    }

    removeProjectsFromObject(object) { 
        // Store tags and subItems information from the object 
        let projects = object['projects']
        // Pulls out tags from object
        delete object['projects']

        return projects
    }

    

// ====================================================================================
// ====================================================================================
// *****************************    Update Functions   ********************************
// ====================================================================================
// ====================================================================================
    /**
     * Author: Josh Widman
     * Input: Command Object
     * return: Create new values object for command object type
     */
    async databaseUpdate(command){
        var type = command.getObject(command) ;
        var ret;

        if (type === 'user'){
            ret = this.updateUser(command);
        } else if (type === "item" ){
            ret = this.updateItem(command);

        } else if (type === "action"){
            ret = this.updateAction(command);
        }
        else if (type === "project"){
            ret = this.updateProject(command);
        }
        else{
            ret = this.databaseUpdate()
        }
        return ret;
    };

    /**
     * Author: Aleks Neceski
     * 
     */
    async updateUser(command) {
        let object = command.getDetail()
        let url = this.backendAPI
        url = url.concat(`user/update/${this.user.authToken}/`);

        let response = await fetch(url, {  
            method: 'PUT',
            body: JSON.stringify(object)
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        }
        // Want some sort of confirmation 
        // user = JSON.parse(response.json());

        return
    };

    /**
     * 
     */
    async updateItem(command) {
        let object = command.getDetail()
        let url = this.backendAPI
        url = url.concat(`item/update/${object.itemId}/`);

        //Remove and store object['tags']
        let tags = this.removeTagsFromObject(object)

        //Remove and store object['subitems']
        let subItems = this.removeSubItemsFromObject(object)

        let response = await fetch(url, {  
            method: 'PUT',
            body: JSON.stringify(object)
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        } else { 
            // Delete all Tags associated with itemId
            let deleteTagsURL = url.concat(`tags/delete-all/${object.itemId}/`)
            await fetch(deleteTagsURL, { 
                method: 'DELETE',
            })

            // Delete all Subitems associated with itemId
            let deleteSubItemsURL = url.concat(`subitem/delete-all-subitem/${object.itemId}/`)
            await fetch(deleteSubItemsURL, { 
                method: 'DELETE',
            })

            // Create all Tags 
            this.postTags(tags)

            // Create all Subitems
            this.postSubItems(subItems)
        }
        
        return

    };

    /**
     * 
     */
    async updateAction(command) {
        let object = command.getDetail()
        let url = this.backendAPI
        url = url.concat(`item/update/${this.user.authToken}/`);

        //Remove and store object['tags']
        let tags = this.removeTagsFromObject(object)

        //Remove and store object['subitems']
        let subItems = this.removeSubItemsFromObject(object)

        let response = await fetch(url, {  
            method: 'PUT',
            body: JSON.stringify(object)
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        } else { 
            // Delete all Tags associated with itemId
            let deleteTagsURL = url.concat(`tags/delete-all/${object.itemId}/`)
            await fetch(deleteTagsURL, { 
                method: 'DELETE',
            })

            // Delete all Subitems associated with itemId
            let deleteSubItemsURL = url.concat(`subitem/delete-all-subitem/${object.itemId}/`)
            await fetch(deleteSubItemsURL, { 
                method: 'DELETE',
            })

            // Create all Tags 
            this.postTags(tags)

            // Create all Subitems
            this.postSubItems(subItems)
        }
        
        return
    };

    /**
     * 
     */
    async updateProject(command) {


    };

// ====================================================================================
// ====================================================================================
// *****************************    Delete Functions   ********************************
// ====================================================================================
// ====================================================================================

    /**
     * Author: Josh Widman
     * Input: Command Object
     * return: Delete type value from command object
     */
    async databaseDelete(command){
        var type = command.getObject(command) ;
        var ret;

        if (type === 'user'){
            ret = this.deleteUser(command);
        } else if (type === "item" ){
            ret = this.deleteItem(command);

        } else if (type === "action"){
            ret = this.deleteAction(command);
        }
        else if (type === "project"){
            ret = this.deleteProject(command);
        }
        else{
            ret = this.databaseDelete();
        };
        return ret;
    }

    /**
     * Author: Aleks Neceski
     * 
     * Deletes the user 
     * 
     * Functionality to be implemented: Gets all of the Items, Actions and Projects and then calls the deleteItems, Actions, Projects functions 
     */
    async deleteUser() {
        let url = this.backendAPI
        url = url.concat(`user/delete/${this.user.authToken}/`);

        let response = await fetch(url, {  
            method: 'DELETE'
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        }
        // Want some sort of confirmation 
        // user = JSON.parse(response.json());

        return
        
    }

    /**
     * 
     * 
     * Functionality to be implemented: Deletes all of the associated SubItems and Tags
     */
     async deleteItem(command) {
        let url = this.backendAPI
        let object = command.getDetail()
        url = url.concat(`user/delete/${object.itemId}/`);

        let response = await fetch(url, {  
            method: 'DELETE'
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        }
        // Want some sort of confirmation 
        // user = JSON.parse(response.json());

        return
    }

    /**
     * 
     * Functionality to be implemented: Deletes all of the associated SubItems and Tags
     */
    async deleteAction(command) {
        let url = this.backendAPI
        url = url.concat(`user/delete/${this.user.authToken}/`);

        let response = await fetch(url, {  
            method: 'DELETE'
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        }
        // Want some sort of confirmation 
        // user = JSON.parse(response.json());

        return
    }

    /**
     * 
     * Functionality to be implemented: Deletes all of the associated SubItems and Tags
     */
    async deleteProject(command) {
        let url = this.backendAPI
        url = url.concat(`user/delete/${this.user.authToken}/`);

        let response = await fetch(url, {  
            method: 'DELETE'
        });

        if (!response.ok){ 
            throw new Error(`HTTP error status: ${response.status}`);
        }
        // Want some sort of confirmation 
        // user = JSON.parse(response.json());

        return
    }



    /**
     * 
     */
    validateUser(command){}
    
}
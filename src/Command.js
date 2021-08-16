const request_types = ['GET', 'POST', 'DELETE', 'PATCH', 'RESPONSE']
const object_types = ["user", "item", "action", "project"]

class Command { 
    
    
    /**
     * This is a constructor for the command type object
     * 
     * type parameter is an integer from 0 to 4 corresponding to one of the HTTP 
     * request types 
     * 
     * detail parameter is a javascript object with key value pairs corresponding to 
     * the attribute name and values of the request or containing the object for the 
     * request/response
     * 
     * object paramater is an integer from 0 to 3 corresponding to one of the object types
     * 
     * ex/ The following would be a command for requesting all of the actions of a
     * particular user 
     * 
     * detail = {}
     * let actionsCommand = Command(1, detail, 2)
     * 
     * 
     */
    constructor(type, detail, object) { 
        this.type = request_types[type]
        this.detail = detail
        this.object = object_types[object]
    };

    getDetail() { 
        return this.detail
    }

    setDetail(detail) { 
        this.detail = detail
    }

    getType() { 
        return this.type
    }

    setType(type) { 
        this.type = type
    }

    getObject(type) { 
        this.object = type
    }
}

export default Command;

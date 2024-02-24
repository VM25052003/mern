//Customised class extending Error
class HttpError extends Error { 
    //Constructor taking message and codes to create an object based 
    constructor(message, codes){
        //To initialise properties correctly, call super() on base class 'Error'
        super(message)
        this.codes = codes
    }
    
}

module.exports = HttpError
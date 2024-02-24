//Customised class extending Error class
class HttpError extends Error{
    //Initiates this class and creating an object based on it
    constructor(message, codes){
        //To initialise properties correctly, have to call super() on base class 'Error'
        super(message)
        this.codes = codes
    }
}

module.exports = HttpError
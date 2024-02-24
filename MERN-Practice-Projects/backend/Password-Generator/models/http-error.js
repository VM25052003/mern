//Extending base class errors, having all its features
class HttpError extends Error {
    //Initiates class and creates object based on it
    constructor(message, code){
        //Initialise properties correctly
        super(message)
        this.code = code
    }
}

module.exports = HttpError
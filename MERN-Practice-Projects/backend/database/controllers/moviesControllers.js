const Movie = require('../models/movies')
const getMovies = async(req, res) => {
    const movieId = req.params.movieId
    try{
        const movie = await Movie.findById(movieId);
        res.status(200).json({movie})
    }
    catch(err){
        res.json(500).json({message: 'Can not find movie'})
    }
}

const postMovies = async (req, res) => {
    // Extract
    const { title, writer, year, actors, franchise, synopsis } = req.body;

    // Create a new Movie instance
    const newMovie = new Movie({
        title,
        writer,
        year,
        actors, 
        franchise,
        synopsis
    });

    try {
        //Save 
        const savedMovie = await newMovie.save();
        //Success
        res.status(201).json(savedMovie);
    }
    catch (err) {
        res.status(500).json({ message: 'Can not save movie' });
    }
};

const updateMovies = async(req, res) => {
    //Extract id and data
    const movieId = req.params.movieId
    const updatedField = req.body
    let foundMovie
    try {
        foundMovie = await Movie.findById(movieId)
    }
    catch {
        res.status(404).json({message: 'Can not find Movie'})
    }
    //Actors exists
    if(updatedField.actors){
        foundMovie.actors = foundMovie.actors.concat(updatedField.actors);
        delete updatedField.actors;
    }
    //Merge
    Object.assign(foundMovie, updatedField);
    try {
        await foundMovie.save()
        res.status(201).json({ message: foundMovie})
    }
    catch(err) {
        res.status(500).json({message: 'Can not update movie'})
    }
}

const deleteMovie = async(req, res) => {
    const movieId = req.params.movieId
    try {
        await Movie.findByIdAndDelete(movieId)
        res.status(201).json({message: 'deleted'})
    }
    catch(err) {
        res.status(500).json({message: 'Can not delete movie'})
    }
}

exports.getMovies = getMovies
exports.postMovies = postMovies
exports.updateMovies = updateMovies
exports.deleteMovie = deleteMovie
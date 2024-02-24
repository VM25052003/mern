const express = require('express')
const moviesController = require('../controllers/moviesControllers')
const router = express.Router()

router.get('/:movieId', moviesController.getMovies)

router.post('/', moviesController.postMovies)

router.patch('/:movieId', moviesController.updateMovies)

router.delete('/:movieId', moviesController.deleteMovie)

module.exports = router;
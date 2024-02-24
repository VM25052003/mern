const Task = require('../models/Task')
const { validationResult } = require('express-validator') 
const moment = require('moment'); 
const HttpError = require('../models/http-error')

exports.getTasks = async(req, res, next) => {
    let task;
    try {
        task = await Task.find()
    } 
    catch {
        return next(new HttpError('Something went wrong, try fetching your tasks later'))
    }
    res.json({ task: task })
}

exports.addTask = async(req, res, next) => {
    //Extract what user entered
    const { task, description, lastDate } = req.body

      //Attempt to parse the date using different formats
      const parsedDate = moment(lastDate, [
        //ISO 8601 format
        moment.ISO_8601, 
        //Custom date format 1
        'YYYY-MM-DD',   
        // Custom date format 2
        'MM/DD/YYYY',   
        // Add more formats as needed
    ]);

    //Convert to ISO 8601 format
    const formattedDate = parsedDate.toISOString(); 

    //Check for valid inputs 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input Fields', 422))
    }

    //Create a task based on model
    const newTask = new Task({ task, description, lastDate: formattedDate })
    try {
        //Save to database
        await newTask.save()
    }
    catch {
        return next(new HttpError('Something went wrong, try saving later', 500))
    }
    //Return response
    res.json({ task: task, description: description, lastDate: formattedDate })
}

exports.editTask = async(req, res, next) => {
    //Extract task id
    const taskId = req.params.taskId
    let identifiedTask;

    //Extract what to update
    const { task, description, lastDate } = req.body

    //Attempt to parse the date using different formats
    const parsedDate = moment(lastDate, [
        //ISO 8601 format
        moment.ISO_8601, 
        //Custom date format 1
        'YYYY-MM-DD',   
        // Custom date format 2
        'MM/DD/YYYY',   
        // Add more formats as needed
    ]);

    //Convert to ISO 8601 format
    const formattedDate = parsedDate.toISOString(); 

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input Fields', 422))
    }
    //Check for valid inputs later
    try {
        //Find task with that id from database
        identifiedTask = await Task.findById(taskId)
    }
    catch {
        return next(new HttpError('Something went wrong, try editing later', 500))
    }
    if(!identifiedTask){
        return next(new HttpError('No such task found', 404))
    }
    //Update and call save
    identifiedTask.task = task,
    identifiedTask.description = description,
    identifiedTask.lastDate = formattedDate
    try {
        await identifiedTask.save()
    } 
    catch {
        return next(new HttpError('Something went wrong. Try again later', 500))
    }
    res.json({task: identifiedTask})
} 

exports.deleteTask = async(req, res, next) => {
    const taskId = req.params.taskId
    let deletedTask;
    try {
        //Find taskId in database and delete
        deletedTask = await Task.findByIdAndRemove(taskId)
    } 
    catch {
        return next(new HttpError('Something went wrong. Try again later', 500))
    }
    if(!deletedTask){
        return next(new HttpError('No such task exist', 404))
    }
    res.json({message: 'deleted'})
}
import React, {useState} from "react";
import './NewGoal.css'

const NewGoal = props => {
    let [entered, setEntered] = useState('')
    const textChangeHandler = event => {
    //event.target refers to input element
    setEntered(event.target.value)
    }
    const addGoalHandler = event => {
        event.preventDefault()
        const newGoal = {
            id: Math.random().toString(),
            goal: entered
        }
        //Once add, reset the input area
        setEntered('')
        //Append new goal to existing list
        props.onAddGoal(newGoal)
    }
    return (
//On clicking button page will reload as default browser behaviour, request being send to server. We are not doing anything on server side her, so  don't want to send such request
        <form className="new-goal" onSubmit={addGoalHandler}>
            {/* the input would show an outdated value, so 'value' is used */}
            <input type="text" value = {entered} onChange={textChangeHandler}/>
            <button type="submit">Add Button</button>
        </form>
    )
}

export default NewGoal;
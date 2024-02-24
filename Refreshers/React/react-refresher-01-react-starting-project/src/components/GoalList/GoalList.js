import React from "react";
import './GoalList.css'

//Function used as react component, means it returns jsx, also receives props. This 'props' bundles all the props passed to component. Here, 'items' is only prop
const GoalList = props => {
    //mapped as props.items is an [] of js, not jsx
    return <ul className='goal-list'>{props.items.map(goals => {
        //Add a special 'key' prop to every item rendering in list
        return <li key={goals.id} >{goals.goal}</li>
    })}</ul>
}

export default GoalList
import React, {useState} from 'react';
import './App.css'
//Need not to be same as what is exported
import Goals from './components/GoalList/GoalList'
import NewGoals from './components/NewGoal/NewGoal'

const App = () => {
/* React does not re-render this jsx code and therefore the real UI, all the time whenever some event is triggered anywhere in the app. So just because we click button doesn't mean that React will re-render the entire screen. Instead we have to tell React when it should re-renderd. So, state is used.*/
  //[Initial state, to change state]
  const [courseGoals, setCourseGoals] = useState([
    {'id': 'cg1', 'goal': 'Finish Courses'},
    {'id': 'cg2', 'goal': 'Learn Main Topics'},
    {'id': 'cg3', 'goal': 'Help other students'}
  ])


  const appendNewGoal = newGoal => {
    //push modifies the existing one, but concat replaces old one with new 
    // setCourseGoals(courseGoals.concat(newGoal))
    //good practice to use the functional approach if the new state depends on the previous state. Otherwise you might get undesired results since the setX function of useState might batch multiple calls.
    setCourseGoals(prevCourseGoals =>  prevCourseGoals.concat(newGoal))
  }

  return (
    <div className='course-goals'>
      <h2>Course Goal</h2>
      {/* Passing some js expression in {} to be merged to jsx, to attribute/ prop 'items' of 'Goals' component*/}
      <NewGoals onAddGoal={appendNewGoal}/>
      <Goals items={courseGoals}/>
    </div>
  )
};

export default App;

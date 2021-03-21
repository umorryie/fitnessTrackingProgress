//import { useState, useEffect } from 'react';
import './App.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
//import { useSelector, useDispatch } from 'react-redux';
//import { selectUserExercises } from './redux/features/userExercises';
import LeftRouting from './components/LeftRouting/LeftRouting';
import DashboardNav from './components/Navbar/DashboardNav';
import ExerciseCard from './components/ExerciseCard/ExerciseCard';

function App() {
  /*
  const [month1, setMonth1] = useState('March');
  const [month2, setMonth2] = useState('April');
  const [month3, setMonth3] = useState('May');
  const exercises = useSelector(selectUserExercises);
  const dispatch = useDispatch();

  const fetchExercises = async () => {
    const data = await fetch('http://localhost:8080/exercises');
    const jsonData = await data.json();
    return jsonData;
  }*/
  return (
    <div className="App">
      <LeftRouting></LeftRouting>
      <div className="rightContainer">
        <DashboardNav></DashboardNav>
        <ExerciseCard></ExerciseCard>
      </div>
    </div>
  );
}

export default App;

import './ExercisesContent.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserExercises } from '../../redux/features/userExercises';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { useState, useEffect } from 'react';
import { getDate } from '../ExerciseCard/ExerciseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../../redux/features/user';
import { insertExerciseAndProgress } from '../../controllers/UserController';
import { validateExerciseInput } from '../../validations/validateExerciseInput';
import { handleError } from '../../errorHandler/errorHandler';

function ExercisesContent() {
    const exitButton = <FontAwesomeIcon icon={faTimes} className="exitIcon" onClick={() => { toggleAddExerciseInput() }} />;

    const dispatch = useDispatch();
    const userExercises = useSelector(selectUserExercises);
    const [exerciseInput, setExerciseInput] = useState('');
    const [loggedExercisesExist, setLoggedExercisesExist] = useState(false);
    const [addExerciseInput, setAddExerciseInput] = useState(false);
    const [addExerciseName, setAddExerciseName] = useState('');
    const [addSets, setAddSets] = useState(0);
    const [addWeight, setAddWeight] = useState(0);
    const [addReps, setAddReps] = useState(0);
    const [addWeightUnit, setAddWeightUnit] = useState('kg');
    const [addDate, setAddDate] = useState(getDate(null));
    const user = useSelector(selectUser);

    useEffect(() => {
        setLoggedExercisesExist(userExercises.exercises && userExercises.exercises.length > 0);
    }, [userExercises.exercises]);
    const addInputs = (event: any, target: string) => {
        switch (target) {
            case 'addReps':
                setAddReps(event.target.value);
                break;
            case 'addSets':
                setAddSets(event.target.value);
                break;
            case 'addWeight':
                setAddWeight(event.target.value);
                break;
            case 'addDate':
                setAddDate(event.target.value);
                break;
            case 'addExerciseName':
                setAddExerciseName(event.target.value);
                break;
        }
    }
    const changeExerciseInput = (event: any) => {
        setExerciseInput(event.target.value);
    }
    const renderExercises = () => {
        if (loggedExercisesExist) {
            const filteredExercises = userExercises.exercises.filter((el: any) => el.exerciseName.toLowerCase().includes(exerciseInput.toLowerCase()));
            const filteredExerciseCards = filteredExercises.map((elData: any, index: number) => (<ExerciseCard data={elData} key={index} />));

            return filteredExerciseCards;
        } else {
            return (<div className="noExerciseYet">
                No exercises logged yet
            </div>);
        }
    }
    const toggleAddExerciseInput = () => {
        setAddExerciseInput(!addExerciseInput);
    }
    const validateAndInsert = () => {
        const validationResponse = validateExerciseInput(addExerciseName, addSets, addReps, addWeight);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            insertExerciseAndProgress(addExerciseName, addSets, addReps, addWeight, addWeightUnit, addDate, user.jwt, dispatch);
            toggleAddExerciseInput();
            setLoggedExercisesExist(true);
        }
    }

    const renderMainContent = () => {
        if (addExerciseInput) {
            return (
                <div className="addExerciseInput">
                    <div className="insertProgressContainer">
                        {exitButton}
                        <input type="text" value={addExerciseName} placeholder="Exercise name" onChange={(event) => { addInputs(event, 'addExerciseName'); }} />
                        <input type="number" value={addReps} placeholder="Add reps" onChange={(event) => { addInputs(event, 'addReps'); }} />
                        <input type="number" value={addSets} placeholder="Add sets" onChange={(event) => { addInputs(event, 'addSets'); }} />
                        <input type="number" value={addWeight} placeholder="Add weight" onChange={(event) => { addInputs(event, 'addWeight'); }} />
                        <input type="date" value={addDate} onChange={(event) => { addInputs(event, 'addDate'); }} />
                        <div className="checkboxes">
                            <div className="weightUnit">
                                <div className={addWeightUnit === 'lbs' ? "lbs weightUnitActive" : "lbs weightUnitNotActive"} onClick={() => { setAddWeightUnit('lbs'); }}><span>lbs</span></div>
                                <div className="slider"></div>
                                <div className={addWeightUnit === 'kg' ? "lbs weightUnitActive" : "lbs weightUnitNotActive"} onClick={() => { setAddWeightUnit('kg'); }}><span>kg</span></div>
                            </div>
                        </div>
                        <div className="insertProgressButton" onClick={() => {
                            validateAndInsert();
                        }}>Insert progress</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="searchContainer">
                        <div className="searchInput">
                            {loggedExercisesExist ?
                                <input type="text"
                                    id="exerciseName"
                                    name="text"
                                    placeholder="Search logged exercises"
                                    value={exerciseInput}
                                    onChange={(event) => { changeExerciseInput(event); }} />
                                : null
                            }
                            <div className="addExerciseButton" onClick={() => { toggleAddExerciseInput(); }}>
                                Add exercise
                                </div>
                        </div>
                    </div>
                    {renderExercises()}
                </div>
            );
        }
    }
    return (<div>
        {renderMainContent()}
    </div>
    );
}

export default ExercisesContent;
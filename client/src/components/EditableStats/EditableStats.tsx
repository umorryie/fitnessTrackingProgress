import './EditableStats.css';
import EditableStatsRow from '..//EditableStatsRow/EditableStatsRow';
import { useSelector } from 'react-redux';
import { selectUserExercises } from '../../redux/features/userExercises';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../../redux/features/user';
import { getDate } from '../ExerciseCard/ExerciseCard';
import IExerciseName from '../../interfaces/IExerciseName';

function EditableStats(data: IExerciseName) {
    const exitButton = <FontAwesomeIcon icon={faTimes} className="exitIcon" onClick={() => { toggleEditingProgress() }} />;

    const user = useSelector(selectUser);
    const [editingProgress, setEditingProgress] = useState(false);
    const [editSets, setEditSets] = useState(0);
    const [editWeight, setEditWeight] = useState(0);
    const [editReps, setEditReps] = useState(0);
    const [editWeightUnit, setEditWeightUnit] = useState('kg');
    const [editExerciseProgressId, setEditExerciseProgressId] = useState(0);
    const [editDate, setEditDate] = useState('');
    const originalExercises: any[] = useSelector(selectUserExercises).originalExercises;
    const addInputs = (event: any, target: string) => {
        switch (target) {
            case 'editReps':
                setEditReps(event.target.value);
                break;
            case 'editSets':
                setEditSets(event.target.value);
                break;
            case 'editWeight':
                setEditWeight(event.target.value);
                break;
            case 'editDate':
                setEditDate(event.target.value);
                break;
        }
    }
    const setRowForEditing = (rowSets: number, rowWeight: number, rowWeightUnit: string, rowReps: number, rawDate: Date, rowId: number) => {
        setEditExerciseProgressId(rowId);
        setEditSets(rowSets);
        setEditWeight(rowWeight);
        setEditReps(rowReps);
        setEditWeightUnit(rowWeightUnit);
        setEditDate(getDate(rawDate));
    }
    const renderContent = () => {
        const content = originalExercises.filter((element: any) => element.exerciseName === data.exerciseName).map((element: any, index: number) => <EditableStatsRow
            key={index}
            rowSets={element.sets}
            rowWeight={element.weight}
            rowWeightUnit={element.weight_unit}
            rowReps={element.reps}
            rowId={element.exerciseProgressId}
            rowDate={determineDateForTableElement(new Date(element.date))}
            rawDate={new Date(element.date)}
            toggleEditingProgress={toggleEditingProgress}
            setRowForEditing={setRowForEditing}
        />).reverse()

        return (
            <table className="editableContent">
                <thead>
                    <tr>
                        <th>Weight</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        );
    }
    const editProgress = () => {
        fetch('api/users/user/update/exerciseProgress', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwt
            },
            mode: 'cors',
            body: JSON.stringify({ exerciseProgressId: editExerciseProgressId, sets: editSets, weight: editWeight, reps: editReps, weightUnit: editWeightUnit, date: editDate })
        }).then(res => res.json()).then(jsonRes => {
            console.log(jsonRes);
        }).catch(e => { console.log(e); })
    }
    const toggleEditingProgress = () => {
        setEditingProgress(!editingProgress);
    }
    return (
        <div className={editingProgress ? "editRowContainer" : "dashboardEditableRowContainer"}>
            {editingProgress ?
                <div className="insertProgressContainer editableContainer">
                    {exitButton}
                    <input type="number" value={editReps} placeholder="Add reps" onChange={(event) => { addInputs(event, 'editReps'); }} />
                    <input type="number" value={editSets} placeholder="Add sets" onChange={(event) => { addInputs(event, 'editSets'); }} />
                    <input type="number" value={editWeight} placeholder="Add weight" onChange={(event) => { addInputs(event, 'editWeight'); }} />
                    <input type="date" value={editDate} onChange={(event) => { addInputs(event, 'editDate'); }} />
                    <div className="checkboxes">
                        <div className="weightUnit">
                            <div className={editWeightUnit === 'lbs' ? "lbs weightUnitActive" : "lbs weightUnitNotActive"} onClick={() => { setEditWeightUnit('lbs'); }}><span>lbs</span></div>
                            <div className="slider"></div>
                            <div className={editWeightUnit === 'kg' ? "lbs weightUnitActive" : "lbs weightUnitNotActive"} onClick={() => { setEditWeightUnit('kg'); }}><span>kg</span></div>
                        </div>
                    </div>
                    <div className="insertProgressButton" onClick={() => { editProgress(); toggleEditingProgress(); }}>Edit progress</div>
                </div>
                :
                renderContent()
            }
        </div>
    );
}

function determineDateForTableElement(date: Date) {
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yearNumber = date.getFullYear();
    const day = date.getDate();
    const monthNumber = date.getMonth();

    return `${day}-${monthsArray[monthNumber]}-${yearNumber}`
}

export default EditableStats;
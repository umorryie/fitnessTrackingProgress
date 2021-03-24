import './EditableStatsRow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../../redux/features/user';
import { useSelector } from 'react-redux';

function EditableStatsRow(data: any) {
    const edit = <FontAwesomeIcon icon={faEdit} className="hoverIcon" />
    const trash = <FontAwesomeIcon icon={faTrash} className="hoverIcon" />
    const { rowSets, rowWeight, rowWeightUnit, rowReps, rowDate, rowId, toggleEditingProgress, setRowForEditing, rawDate } = data;
    const user = useSelector(selectUser);

    const deleteRow = () => {
        fetch('http://localhost:3001/api/users/user/delete/exerciseProgress', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwt
            },
            mode: 'cors',
            body: JSON.stringify({ exerciseProgressId: rowId })
        }).then(res => res.json()).then(jsonRes => {
            console.log(jsonRes);
        }).catch(e => { console.log(e); })
    }

    return (
        <tr className="">
            <td className="weight">{rowWeight} {rowWeightUnit}</td>
            <td className="sets">{rowSets}</td>
            <td className="sets">{rowReps}</td>
            <td className="sets">{rowDate}</td>
            <td className="sets" onClick={() => { toggleEditingProgress(); setRowForEditing(rowSets, rowWeight, rowWeightUnit, rowReps, rawDate, rowId,); }}>{edit}</td>
            <td className="sets" onClick={() => deleteRow()}>{trash}</td>
        </tr>
    );
}

export default EditableStatsRow;
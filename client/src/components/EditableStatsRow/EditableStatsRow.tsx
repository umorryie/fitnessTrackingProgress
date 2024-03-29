import './EditableStatsRow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../../redux/features/user';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRow } from '../../controllers/UserController';

function EditableStatsRow(data: any) {
    const edit = <FontAwesomeIcon icon={faEdit} className="hoverIcon editIcon" />
    const trash = <FontAwesomeIcon icon={faTrash} className="hoverIcon trashIcon" />
    const { rowSets, rowWeight, rowWeightUnit, rowReps, rowDate, rowId, toggleEditingProgress, setRowForEditing, rawDate } = data;
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    return (
        <tr className="">
            <td className="weight tableColor">{rowWeight} {rowWeightUnit}</td>
            <td className="sets tableColor">{rowSets}</td>
            <td className="sets tableColor">{rowReps}</td>
            <td className="sets tableColor">{rowDate}</td>
            <td className="sets" onClick={() => { toggleEditingProgress(); setRowForEditing(rowSets, rowWeight, rowWeightUnit, rowReps, rawDate, rowId,); }}>{edit}</td>
            <td className="sets" onClick={() => deleteRow(rowId, user.jwt, dispatch)}>{trash}</td>
        </tr>
    );
}

export default EditableStatsRow;
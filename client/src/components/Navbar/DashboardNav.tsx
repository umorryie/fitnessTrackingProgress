import './DashboardNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveNavbar } from '../../redux/features/activeNavbar';
import { setJWT } from '../../redux/features/user';
import { useHistory } from "react-router-dom";
import { setUserExercises, setOriginalExercises } from '../../redux/features/userExercises';

function DashboardNav() {
    const bell = <FontAwesomeIcon icon={faBell} />
    const settings = <FontAwesomeIcon icon={faCog} />
    const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} className="signOutIcon" />

    const dispatch = useDispatch();
    const activeNav = useSelector(selectActiveNavbar);
    const history = useHistory();

    const signOut = () => {
        localStorage.removeItem("jwt");
        dispatch(setJWT(null));
        dispatch(setUserExercises([]));
        dispatch(setOriginalExercises([]));
        history.push('/login');
    }

    return (
        <div className="dashboardContainer">
            <div className="dashboard">
                <div className="pageText cursorHover">{activeNav.activeNavbar}</div>
                <div className="ulDiv">
                    <ul className="personalInfo">
                        <li className="cursorHover mediaDisplay">{getTodaysDate()}</li>
                        <li className="cursorHover mediaDisplay">{bell}</li>
                        <li className="cursorHover mediaDisplay">{settings}</li>
                        <li className="pictureLi mediaDisplay">
                            <img className="profilePicture" src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70" alt="profile" />
                        </li>
                        <li className="cursorHover" onClick={() => { signOut() }}>{signOutIcon}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const getTodaysDate = (): string => {
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const todayDate = new Date();
    const month: number = todayDate.getMonth();
    const dayNumber: number = todayDate.getDate();
    const dayInWeekNumber: number = todayDate.getDay();
    const dayName: string = days[dayInWeekNumber];
    const monthName = monthsArray[month];
    const year: number = todayDate.getFullYear();

    return `${dayNumber} ${monthName} ${year}, ${dayName}`;
}
export default DashboardNav;
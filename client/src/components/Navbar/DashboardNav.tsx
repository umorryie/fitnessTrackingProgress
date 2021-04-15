import './DashboardNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faSignOutAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveNavbar } from '../../redux/features/activeNavbar';
import { setJWT } from '../../redux/features/user';
import { useHistory } from "react-router-dom";
import { setUserExercises, setOriginalExercises } from '../../redux/features/userExercises';

function DashboardNav() {
    const bell = <FontAwesomeIcon icon={faBell} />
    const settings = <FontAwesomeIcon icon={faCog} />
    const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} className="signOutIcon" />
    const showNavArrow = <FontAwesomeIcon icon={faChevronRight} />;

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
            <div className="hamburger" onClick={() => {
                document.getElementsByClassName('leftNavigationDashboardFixedPosition')[0].className = "leftNavigationDashboardFixedPosition hamburger-to-navbar "
            }}>{showNavArrow}</div>
            <div className="dashboard">
                <div className="pageText cursorHover">{activeNav.activeNavbar}</div>
                <div className="ulDiv">
                    <ul className="personalInfo">
                        <li className="cursorHover mediaDisplay">{getTodaysDate()}</li>
                        <li className="cursorHover mediaDisplay">{bell}</li>
                        <li className="cursorHover mediaDisplay">{settings}</li>
                        <li className="pictureLi mediaDisplay profilePicture">
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
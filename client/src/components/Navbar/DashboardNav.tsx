import './DashboardNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectActiveNavbar } from '../../redux/features/activeNavbar';

function DashboardNav() {
    const activeNav = useSelector(selectActiveNavbar);
    const bell = <FontAwesomeIcon icon={faBell} />
    const settings = <FontAwesomeIcon icon={faCog} />

    return (
        <div className="dashboardContainer">
            <div className="dashboard">
                <div className="pageText cursorHover">{activeNav.activeNavbar}</div>
                <div className="ulDiv">
                    <ul className="personalInfo">
                        <li className="cursorHover">10 Mar 2021, Wednesday</li>
                        <li className="cursorHover">{bell}</li>
                        <li className="cursorHover">{settings}</li>
                        <li className="pictureLi">
                            <img className="profilePicture" src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70" alt="profile" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardNav;
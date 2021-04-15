import './DashboardContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectActiveNavbar } from '../../redux/features/activeNavbar';

function DashboardContent() {
    const activeNav = useSelector(selectActiveNavbar);
    const bell = <FontAwesomeIcon icon={faBell} />
    const settings = <FontAwesomeIcon icon={faCog} />

    return (
        <div className="dashboardContainer">
            <div className="dashboard">
                <div className="pageText cursorHover">{activeNav.activeNavbar}</div>
                <div className="ulDiv">
                  TODO
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;
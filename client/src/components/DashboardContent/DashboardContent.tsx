import './DashboardContent.css';
import { useSelector } from 'react-redux';
import { selectActiveNavbar } from '../../redux/features/activeNavbar';

function DashboardContent() {
    const activeNav = useSelector(selectActiveNavbar);

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
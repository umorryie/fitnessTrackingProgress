import './LeftRouting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUserFriends, faChartBar } from '@fortawesome/free-solid-svg-icons';
import navbarEnums from '../../constants/NavbarEnums';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveNavbar, selectActiveNavbar } from '../../redux/features/activeNavbar';

function LeftRouting() {
    const activeNav = useSelector(selectActiveNavbar);
    const dispatch = useDispatch();

    const exercisesIcon = <FontAwesomeIcon icon={faDumbbell} className={activeNav.activeNavbar === navbarEnums.exercises ? "iconActive" : "iconNotActive"} />
    const friendsIcon = <FontAwesomeIcon icon={faUserFriends} className={activeNav.activeNavbar === navbarEnums.friends ? "iconActive" : "iconNotActive"} />
    const dashboardIcon = <FontAwesomeIcon icon={faChartBar} className={activeNav.activeNavbar === navbarEnums.dashboard ? "iconActive" : "iconNotActive"} />

    const closeNavbar = () => {
        document.getElementsByClassName('leftNavigationDashboardFixedPosition')[0].className = "leftNavigationDashboardFixedPosition";
    };

    return (
        <div className="leftNavigationDashboardFixedPosition">
            <div className="leftNavigationDashboard">
                <div className="navListing">
                    {/*<div className={activeNav.activeNavbar === navbarEnums.dashboard ? "specificNav specificNavActive" : "specificNav specificNavNotActive"}
                        onClick={() => dispatch(setActiveNavbar(navbarEnums.dashboard))}
                    >
                        <span className="navItem">
                            {dashboardIcon}
                        </span>
                        <span className="">
                            {navbarEnums.dashboard}
                        </span>
                     </div>*/}
                    <div className={activeNav.activeNavbar === navbarEnums.exercises ? "specificNav specificNavActive" : "specificNav specificNavNotActive"}
                        onClick={() => { dispatch(setActiveNavbar(navbarEnums.exercises)); closeNavbar(); }}
                    >
                        <span className="navItem">
                            {exercisesIcon}
                        </span>
                        <span className="">
                            {navbarEnums.exercises}
                        </span>
                    </div>
                    <div className={activeNav.activeNavbar === navbarEnums.friends ? "specificNav specificNavActive" : "specificNav specificNavNotActive"}
                        onClick={() => { dispatch(setActiveNavbar(navbarEnums.friends)); closeNavbar(); }}
                    >
                        <span className="navItem">
                            {friendsIcon}
                        </span>
                        <span className="">
                            {navbarEnums.friends}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftRouting;
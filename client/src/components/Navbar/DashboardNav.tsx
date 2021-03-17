import React from 'react';
import './DashboardNav.css'
import profile from '../../images/profile.jpeg';
type Props = {
    name: string,
    date: string,
    toggleMainMenu: any
}

class DashboardNav extends React.Component<Props> {
    render() {
        return (
            <div className="dashboardNav">
                <div className="dashboardName"><div className="menuIcon" onClick={this.props.toggleMainMenu}>☰</div>{this.props.name}</div>
                <div className="dashboardIcons">
                    <div className="date">{this.props.date}</div>
                    <div className="profileImage">
                        <img src={profile} alt="profile"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardNav;
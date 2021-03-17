import React from 'react';
import './DashboardContainer.css'
import LeftRouting from '../LeftRouting/LeftRouting';
import Dashboard from '../Dashboard/Dashboard';
type Props = {
    toggle: boolean
}

class DashboardContainer extends React.Component<{}, Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            toggle: false
        }
    }
    toggleMainMenu = () => {
        this.setState({ toggle: !this.state.toggle });
    }
    cancelToggle = () =>{
        return !this.state.toggle ? null : <span className="cancelToggle" onClick={this.toggleMainMenu}>&#10005;</span>
    }
    render() {
        return (
            <div className="dashboardMainContainer">
                <div className={this.state.toggle ? " showLeftRouting" : "leftRouting"}>
                {this.cancelToggle()}
                    <LeftRouting></LeftRouting>
                </div>
                <div className="rightSideOfDashBoardContainer">
                    <Dashboard toggleMainMenu={this.toggleMainMenu}></Dashboard>
                </div>
            </div>
        );
    }
}

export default DashboardContainer;
import React from 'react';
import './Dashboard.css'
import DashboardNav from '../Navbar/DashboardNav';
interface MyProps {
    name: string,
    toggleMainMenu: any,
}
interface ParentProps {
    toggleMainMenu: any
}

class Dashboard extends React.Component<ParentProps, MyProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "Dashboard",
            toggleMainMenu: this.props.toggleMainMenu
        }
    }
    getDate = (): string => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date: Date = new Date();
        const rightNow = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return rightNow;
    };
    getName = (): string => {
        return this.state.name;
    }
    render() {
        return (
            <div className="dashboardContainer">
                <div className="exerciseCardsContainers">
                </div>
            </div>
        );
    }
}

export default Dashboard;
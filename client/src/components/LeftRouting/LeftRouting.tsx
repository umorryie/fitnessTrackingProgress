import React from 'react';
import './LeftRouting.css'
import logoFitness from '../../images/fitnessLogo.jpg';
class LeftRouting extends React.Component {
    render() {
        return (
            <div className="leftRoutingContainer">
                <div className="logoContainer">
                    <div className="logoImage">
                        <img src={logoFitness} alt="fitness logo"></img>
                    </div>
                </div>
                <div className="routingContainer">
                    <div className="">
                        <div className="dashboardRoutingListing">Dashboard</div>
                        <div className="dashboardRoutingListing">Exercises</div>
                        <div className="dashboardRoutingListing">Friends</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftRouting;
import './LandingPage.css';
import { useHistory } from "react-router-dom";
import { demoLogin } from '../../controllers/UserController';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const AOS = require('aos');

function LandingPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const navigate = (destination: string) => {
        history.push(destination);
    }

    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);
    return (
        <div className="landingPage">
            <section id="section1" className="firstPage">
                <div className="firstPageContainer">
                    <div className="signUpAndLoginButtons">
                        <div className="logIn" onClick={() => navigate('/login')}>Log In</div>
                        <div className="signUp" onClick={() => navigate('/signup')}>Sign up</div>
                    </div>
                    <div className="firstPageContentContainer">
                        <h1 className="title typing1"> Let's track</h1><br></br>
                        <h1 className="title typing2">
                            progress</h1><br></br>
                        <h1 className="title typing3">
                            together</h1>
                        <h3 className="subTitle" >Track progress and watch how you progress in your fitness journey</h3>
                        <div className="signUpAndLearnMore">
                            {/*<div className="signUpNow" onClick={() => navigate('/signup')}>Sign up now</div>
                            <div className="learnMore">Learn more</div>*/}
                            <div className="signUpNow" onClick={() => demoLogin(dispatch, history)}>Try demo</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
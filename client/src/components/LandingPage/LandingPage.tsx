import './LandingPage.css';
import { useHistory } from "react-router-dom";

function LandingPage() {
    const history = useHistory();

    const navigate = (destination: string) => {
        history.push(destination);
    }
    return (
        <div className="landingPage">
            <section id="section1" className="firstPage">
                <div className="firstPageContainer">
                    <div className="signUpAndLoginButtons">
                        <div className="logIn" onClick={() => navigate('/login')}>Log In</div>
                        <div className="signUp" onClick={() => navigate('/signup')}>Sign up</div>
                    </div>
                    <div className="firstPageContentContainer">
                        <h1 className="title"> Let's track progress together</h1>
                        <h3 className="subTitle" >Track progress and watch how you progress in your fitness journey</h3>
                        <div className="signUpAndLearnMore">
                            <div className="signUpNow" onClick={() => navigate('/signup')}>Sign up now</div>
                            <div className="learnMore">Learn more</div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2" className="secondPage">
                sdf
            </section>
        </div>
    );
}

export default LandingPage;
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { registerUser } from '../../controllers/UserController';
import { validateSignUp } from '../../validations/signup';
import { handleError } from '../../errorHandler/errorHandler';

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const redirectToLogin = () => {
        history.push("/login");
    }
    const firstNameInput = (event: any) => {
        setFirstName(event.target.value);
    }
    const lastNameInput = (event: any) => {
        setLastName(event.target.value);
    }
    const passwordInput = (event: any) => {
        setPassword(event.target.value);
    }
    const emailInput = (event: any) => {
        setUserEmail(event.target.value);
    }
    const rePasswordInput = (event: any) => {
        setRepassword(event.target.value);
    }
    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            signUpWithValidation();
        }
    }
    const signUpWithValidation = () => {
        const validationResponse = validateSignUp(firstName, lastName, userEmail, password, repassword);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            registerUser(firstName, lastName, userEmail, password, repassword, dispatch, history);
        }
    }

    return (
        <div className="signUpContainer">
            <video className="video" autoPlay muted loop>
                <source src="motivation.mp4" type="video/mp4" />
            </video>
            <div className="signUpInnerContainer">
                <div className="signUpCenterContainer">

                    <div className="loginTitle" onClick={() => { redirectToLogin(); }}>Login</div>
                    <div className="signUpTitle">Sign up</div>
                    <div className="emailSignUp">
                        <input type="text" id="firstName" name="firstName" placeholder="First name" onChange={(event) => { firstNameInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="emailSignUp">
                        <input type="text" id="lastName" name="lastName" placeholder="Last name" onChange={(event) => { lastNameInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="emailSignUp">
                        <input type="text" id="email" name="email" placeholder="Email address" onChange={(event) => { emailInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="passwordSignUp">
                        <input type="password" id="password" name="password" placeholder="Password" onChange={(event) => { passwordInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="passwordSignUp">
                        <input type="password" id="repassword" name="re-password" placeholder="Re-enter password" onChange={(event) => { rePasswordInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="tos">
                        <div className="tosContainer">
                            <input type="checkbox" id="tos" />
                            <label htmlFor="tos">I agree with the <span>Terms & Conditions</span></label>
                        </div>
                    </div>
                    <div className="submitSignUp">
                        <button onClick={() => { signUpWithValidation(); }}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

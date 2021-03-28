import './SignUp.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { registerUser } from '../../controllers/UserController';

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const redirectToLogin = () => {
        history.push("/login");
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
            registerUser(userEmail, password, repassword, dispatch, history);
        }
    }

    return (
        <div className="signUpContainer">
            <div className="signUpInnerContainer">
                <div className="signUpCenterContainer">

                    <div className="loginTitle" onClick={() => { redirectToLogin(); }}>Login</div>
                    <div className="signUpTitle">Sign up</div>
                    <div className="emailSignUp">
                        <input type="text" id="email" name="email" placeholder="Email address" onChange={(event) => { emailInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="passwordSignUp">
                        <input type="password" id="password" name="password" placeholder="Password" onChange={(event) => { passwordInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="passwordSignUp">
                        <input type="password" id="password" name="re-password" placeholder="Re-enter password" onChange={(event) => { rePasswordInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="tos">
                        <div className="tosContainer">
                            <input type="checkbox" id="tos" />
                            <label htmlFor="tos">I agree with the <span>Terms & Conditions</span></label>
                        </div>
                    </div>
                    <div className="submitSignUp">
                        <button onClick={() => { registerUser(userEmail, password, repassword, dispatch, history); }}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

import './Login.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { setUserInformation, loginCredentials } from '../../controllers/UserController';
import { validateLogin } from '../../validations/login';
import { handleError } from '../../errorHandler/errorHandler';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setUserInformation(token, history, dispatch, false);
        }
    }, [history, dispatch]);

    const redirectToSignUp = () => {
        history.push("/signup");
    }
    const passwordInput = (event: any) => {
        setPassword(event.target.value);
    }
    const emailInput = (event: any) => {
        setUserEmail(event.target.value);
    }
    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            loginWithValidation();
        }
    }
    const loginWithValidation = () => {
        const validationResponse = validateLogin(userEmail, password);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            loginCredentials(userEmail, password, dispatch, history);
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginInnerContainer">
                <div className="loginCenterContainer">
                    <div className="loginTitle">Login</div>
                    <div className="signUpTitle" onClick={() => { redirectToSignUp(); }}>Sign up</div>
                    <div className="emailLogin">
                        <input type="text" id="email" name="email" placeholder="Email address" onChange={(event) => { emailInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="passwordLogin">
                        <input type="password" id="password" name="password" placeholder="Password" onChange={(event) => { passwordInput(event); }} onKeyDown={event => onKeyDown(event)} />
                    </div>
                    <div className="rememberMe">
                        <div className="rememberMeContainer">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="forgotPw">
                            Forgot password?
                    </div>
                    </div>
                    <div className="submitLogin">
                        <button onClick={() => { loginWithValidation(); }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

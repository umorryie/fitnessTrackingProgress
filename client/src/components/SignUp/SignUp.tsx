import './SignUp.css';
import { useDispatch } from 'react-redux';
import { setJWT } from '../../redux/features/user';
import { useHistory } from 'react-router';
import { useState } from 'react';

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const redirectToLogin = () => {
        history.push("/login");
    }
    const passwordInput = (event: any) => {
        setPassword(event.target.value);
    }
    const emailInput = (event: any) => {
        setEmail(event.target.value);
    }
    const rePasswordInput = (event: any) => {
        setRepassword(event.target.value);
    }
    const registerUser = () => {
        fetch('http://localhost:3001/api/users/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ userEmail: email, password, repassword })
        }).then(res => res.json()).then(result => {
            const { token, userEmail } = result;
            if (token && userEmail) {
                localStorage.setItem('jwt', token);
                dispatch(setJWT(token));
                history.push('/dashboard');
            }
        })
    }
    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            registerUser();
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
                        <button onClick={() => { registerUser(); }}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

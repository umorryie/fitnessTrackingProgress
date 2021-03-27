import './Login.css';
import { useDispatch } from 'react-redux';
import { setJWT } from '../../redux/features/user';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { setUserExercises, setOriginalExercises } from '../../redux/features/userExercises';
import { setExerciseList } from '../../redux/features/exerciseList';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setUserInformation(token);
        }
    }, []);

    const redirectToSignUp = () => {
        history.push("/signup");
    }
    const passwordInput = (event: any) => {
        setPassword(event.target.value);
    }
    const emailInput = (event: any) => {
        setEmail(event.target.value);
    }
    const setExercises = () => {
        fetch('api/exercises/getExercises')
            .then(res => res.json())
            .then(exercises => {
                const notCustomExercises = exercises.filter((el: any) => !el.isCustomExercise);
                dispatch(setExerciseList(notCustomExercises));
            })
    }
    const setUserInformation = (token: string) => {
        fetch('api/users/user/getUser', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            mode: 'cors',
        }).then(el => el.json()).then(res => {
            const { error } = res;
            if (!error) {
                const exercisesResponse = res.exercises;
                const originalExerciseResponse = res.originalExercises;

                if (exercisesResponse && originalExerciseResponse) {
                    dispatch(setJWT(token));
                    dispatch(setUserExercises(exercisesResponse));
                    dispatch(setOriginalExercises(originalExerciseResponse));
                    setExercises();
                    history.push('/dashboard');
                }
            }
        }).catch(er => console.log(er));
    }
    const loginCredentials = () => {
        fetch('api/users/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ userEmail: email, password })
        }).then(res => res.json()).then((results: any) => {
            if (results && results.match) {
                const token = results.token;
                if (token) {
                    localStorage.setItem('jwt', token);
                    setUserInformation(token);
                }
            } else {
                alert("Password do not match");
            }
        })
    }
    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            loginCredentials();
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
                        <button onClick={() => { loginCredentials(); }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

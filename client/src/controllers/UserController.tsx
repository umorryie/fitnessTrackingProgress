import { setJWT } from '../redux/features/user';
import { setUserExercises, setOriginalExercises } from '../redux/features/userExercises';
import { setExerciseList } from '../redux/features/exerciseList';
import { handleError } from '../errorHandler/errorHandler';
import { setFriends } from '../redux/features/friends';
import { setAllUsers } from '../redux/features/allUsers';
const proxy = 'https://fitnessbackendtracking.herokuapp.com/';

const setExercises = (dispatch: any) => {
    fetch(`${proxy}` + 'api/exercises/getExercises')
        .then(res => res.json())
        .then(exercises => {
            if (handleError(exercises, dispatch)) {
                return;
            }
            const notCustomExercises = exercises.filter((el: any) => !el.isCustomExercise);
            dispatch(setExerciseList(notCustomExercises));
        })
        .catch(console.log)
}

const setUserInformation = (token: string, history: any, dispatch: any, validateError: boolean) => {
    fetch(`${proxy}` + 'api/users/user/getUser', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        mode: 'cors',
    }).then(el => el.json()).then(res => {
        if (validateError) {
            if (handleError(res, dispatch)) {
                return;
            }
        }

        const exercisesResponse = res.exercises;
        const originalExerciseResponse = res.originalExercises;

        if (exercisesResponse && originalExerciseResponse) {
            dispatch(setJWT(token));
            dispatch(setUserExercises(exercisesResponse));
            dispatch(setOriginalExercises(originalExerciseResponse));
            setExercises(dispatch);
            history.push('/dashboard');
            setUpFriends(token, dispatch);
            getAndSetAllUsers(token, dispatch);
        }
    }).catch(er => console.log(er));
}

const setUserInformationAfterDatabaseModification = (token: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/user/getUser', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        mode: 'cors',
    }).then(el => el.json()).then(res => {
        if (handleError(res, dispatch)) {
            return;
        }
        const exercisesResponse = res.exercises;
        const originalExerciseResponse = res.originalExercises;

        if (exercisesResponse && originalExerciseResponse) {
            dispatch(setJWT(token));
            dispatch(setUserExercises(exercisesResponse));
            dispatch(setOriginalExercises(originalExerciseResponse));
            setExercises(dispatch);
            getAndSetAllUsers(token, dispatch);
        }
    }).catch(er => console.log(er));
}

const loginCredentials = (userEmail: string, password: string, dispatch: any, history: any) => {
    fetch(`${proxy}` + 'api/users/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ userEmail, password })
    }).then(res => res.json()).then((results: any) => {
        if (handleError(results, dispatch)) {
            return;
        }
        if (results && results.match) {
            const token = results.token;
            if (token) {
                localStorage.setItem('jwt', token);
                setUserInformation(token, history, dispatch, true);
            }
        }
    }).catch(console.log)
}

const registerUser = (firstName: string, lastName: string, userEmail: string, password: string, repassword: string, dispatch: any, history: any) => {
    fetch(`${proxy}` + 'api/users/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ firstName, lastName, userEmail, password, repassword })
    }).then(res => res.json()).then(result => {
        if (handleError(result, dispatch)) {
            return;
        }
        const { token, userEmail } = result;
        if (token && userEmail) {
            localStorage.setItem('jwt', token);
            dispatch(setJWT(token));
            history.push('/dashboard');
            getAndSetAllUsers(token, dispatch);
        }
    }).catch(console.log)
}

const editProgress = (editExerciseProgressId: number, editSets: number, editWeight: number, editReps: number, editWeightUnit: string, editDate: string, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/user/update/exerciseProgress', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ exerciseProgressId: editExerciseProgressId, sets: editSets, weight: editWeight, reps: editReps, weightUnit: editWeightUnit, date: editDate })
    }).then(res => res.json()).then(jsonRes => {
        if (handleError(jsonRes, dispatch)) {
            return;
        }
        setUserInformationAfterDatabaseModification(jwt, dispatch);
    }).catch(e => { console.log(e); })
}

const deleteRow = (rowId: number, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/user/delete/exerciseProgress', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ exerciseProgressId: rowId })
    }).then(res => res.json()).then(jsonRes => {
        if (handleError(jsonRes, dispatch)) {
            return;
        }
        setUserInformationAfterDatabaseModification(jwt, dispatch);
    }).catch(e => { console.log(e); })
}


const insertProgress = (exerciseName: string, sets: number, reps: number, weight: number, weightUnit: string, date: string, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/user/postExerciseProgress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ exerciseName, sets, reps, weight, weightUnit, date })
    }).then(res => res.json())
        .then(el => {
            if (handleError(el, dispatch)) {
                return;
            }
            setUserInformationAfterDatabaseModification(jwt, dispatch);
        })
        .catch(console.log)
}

const insertExerciseAndProgress = (exerciseName: string, sets: number, reps: number, weight: number, weightUnit: string, date: string, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/user/postExerciseProgress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ exerciseName, sets, reps, weight, weightUnit, date })
    }).then(res => res.json())
        .then(el => {
            if (handleError(el, dispatch)) {
                return;
            }
            setUserInformationAfterDatabaseModification(jwt, dispatch);
        })
        .catch(console.log)
}

const setUpFriends = (jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors'
    }).then(res => res.json())
        .then(el => {
            if (handleError(el, dispatch)) {
                return;
            }
            dispatch(setFriends(el));
        })
        .catch(console.log)
}

const confirmFriendRequest = (friendshipId: number, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/friends/confirmation', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ friendshipId })
    }).then(res => res.json())
        .then(el => {
            if (handleError(el, dispatch)) {
                return;
            }
            setUpFriends(jwt, dispatch);
        })
        .catch(console.log)
}

const deleteFriendRequest = (friendEmail: string, reverseNumbers: boolean, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/friends/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ friendEmail, reverseNumbers })
    }).then(res => res.json())
        .then(el => {
            if (handleError(el, dispatch)) {
                return;
            }
            setUpFriends(jwt, dispatch);
        })
        .catch(console.log)
}

const getAndSetAllUsers = (jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors'
    }).then(res => res.json())
        .then(users => {
            if (handleError(users, dispatch)) {
                return;
            }
            dispatch(setAllUsers(users));
        })
        .catch(console.log)
};

const sendFriendRequest = (friendEmail: string, jwt: string, dispatch: any) => {
    fetch(`${proxy}` + 'api/users/friends/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        mode: 'cors',
        body: JSON.stringify({ friendEmail })
    }).then(res => res.json())
        .then(users => {
            if (handleError(users, dispatch)) {
                return;
            }
            setUpFriends(jwt, dispatch);
        })
        .catch(console.log)
};
export { sendFriendRequest, setUserInformation, getAndSetAllUsers, loginCredentials, registerUser, editProgress, deleteRow, insertProgress, insertExerciseAndProgress, confirmFriendRequest, deleteFriendRequest };
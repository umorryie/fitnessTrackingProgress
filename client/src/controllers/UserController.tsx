import { setJWT } from '../redux/features/user';
import { setUserExercises, setOriginalExercises } from '../redux/features/userExercises';
import { setExerciseList } from '../redux/features/exerciseList';
import { handleError } from '../errorHandler/errorHandler';

const setExercises = (dispatch: any) => {
    fetch('api/exercises/getExercises')
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
    fetch('api/users/user/getUser', {
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
        }
    }).catch(er => console.log(er));
}

const setUserInformationAfterDatabaseModification = (token: string, dispatch: any) => {
    fetch('api/users/user/getUser', {
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
        }
    }).catch(er => console.log(er));
}

const loginCredentials = (userEmail: string, password: string, dispatch: any, history: any) => {
    fetch('api/users/user/login', {
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

const registerUser = (userEmail: string, password: string, repassword: string, dispatch: any, history: any) => {
    fetch('api/users/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ userEmail, password, repassword })
    }).then(res => res.json()).then(result => {
        if (handleError(result, dispatch)) {
            return;
        }
        const { token, userEmail } = result;
        if (token && userEmail) {
            localStorage.setItem('jwt', token);
            dispatch(setJWT(token));
            history.push('/dashboard');
        }
    }).catch(console.log)
}

const editProgress = (editExerciseProgressId: number, editSets: number, editWeight: number, editReps: number, editWeightUnit: string, editDate: string, jwt: string, dispatch: any) => {
    fetch('api/users/user/update/exerciseProgress', {
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
    fetch('api/users/user/delete/exerciseProgress', {
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
    fetch('api/users/user/postExerciseProgress', {
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
    fetch('api/users/user/postExerciseProgress', {
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

export { setUserInformation, loginCredentials, registerUser, editProgress, deleteRow, insertProgress, insertExerciseAndProgress };
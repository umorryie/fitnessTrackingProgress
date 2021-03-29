import { setErrorExist, setMessage } from '../redux/features/errorHandler';

const handleError = (serverResponse: any, dispatch: any) => {
    if (serverResponse) {
        const { error } = serverResponse;

        if (error) {
            const { message, sqlMessage } = error;
            if (message) {
                dispatch(setErrorExist(true));
                dispatch(setMessage(message));
                return true;
            } else if (sqlMessage) {
                if (sqlMessage.includes(`for key 'email'`)) {
                    dispatch(setErrorExist(true));
                    dispatch(setMessage('Account with this email already exists.'));
                    return true;
                } else {
                    dispatch(setErrorExist(true));
                    dispatch(setMessage(sqlMessage));
                    return true;
                }
            } else {
                const { details } = error;

                if (details && details.length > 0) {
                    let message: string = "";
                    details.forEach((detail: any) => {
                        if (detail && detail.message) {
                            message += `${detail.message} .`;
                        }
                    });

                    dispatch(setErrorExist(true));
                    dispatch(setMessage(message));
                    return true;
                } else {
                    dispatch(setErrorExist(true));
                    dispatch(setMessage(JSON.stringify(error)));
                    return true;
                }
            }
        }
    }

    return false;
}

export { handleError };
const validateLogin = (email: string, password: string,) => {
    if (email === "") {
        return mergeResponseObjectWithMessage("Email should not be empty.")
    }
    if (!validateEmail(email)) {
        return mergeResponseObjectWithMessage("Email should be valid.")
    }
    if (password === "") {
        return mergeResponseObjectWithMessage("Password should not be empty.")
    }
    if (password.length < 8) {
        return mergeResponseObjectWithMessage("Password must have at least 8 characters.")
    }
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*=!"<>])/.test(password)) {
        return mergeResponseObjectWithMessage("Password must contain special character and number.");
    }

    return null;
}

const mergeResponseObjectWithMessage = (message: string) => {
    return {
        error: {
            message
        }
    };
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export { validateLogin };
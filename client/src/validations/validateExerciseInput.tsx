const validateExerciseInput = (addExerciseName: string | null, sets: number, reps: number, weight: number) => {
    if (addExerciseName && addExerciseName === "") {
        return mergeResponseObjectWithMessage("Exercise name is required.")
    }
    if (sets < 1) {
        return mergeResponseObjectWithMessage("Sets should be greater or equal to 1.")
    }
    if (reps < 1) {
        return mergeResponseObjectWithMessage("Sets should be greater or equal to 1.")
    }
    if (weight < 1) {
        return mergeResponseObjectWithMessage("Sets should be greater or equal to 1.")
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

export { validateExerciseInput };
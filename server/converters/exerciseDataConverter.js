const convert = (arrayOfExercises, userEmail) => {
    const response = {};
    response.email = userEmail;
    response.exercises = getExercisesKeysObject(arrayOfExercises);

    return response;
}

const getExercisesKeysObject = (arrayOfExercises) => {
    const exerciseObject = {};
    const exercisesSet = new Set();
    arrayOfExercises.forEach(element => {
        exercisesSet.add(element.exerciseName);
    })
    for (let item of exercisesSet) {
        const exerciseBelongingData = arrayOfExercises.filter(exercise => exercise.exerciseName == item).sort((a, b) => {
            const result = new Date(a.date) - new Date(b.date);
            return result;
        });
        const groups = exerciseBelongingData.reduce((groups, exerciseInput) => {
            const date = exerciseInput.date.toISOString().split('T')[0]
            if (! groups[date]) {
                groups[date] = [];
            }
            groups[date].push(exerciseInput);
            return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((date) => {
            return {date, exerciseInputForTheDay: groups[date]};
        });
        exerciseObject[item] = groupArrays;
    }
    return exerciseObject;
}

module.exports = {
    convert
}

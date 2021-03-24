import { createSlice } from '@reduxjs/toolkit';

export const userExercisesSlice = createSlice({
    name: 'userExercises',
    initialState: {
        exercises: [],
        originalExercises: []
    },
    reducers: {
        setUserExercises: (state, action) => {
            state.exercises = action.payload
        },
        setOriginalExercises: (state, action) => {
            state.originalExercises = action.payload
        }
    }
});

export const { setUserExercises, setOriginalExercises } = userExercisesSlice.actions;
export const selectUserExercises = (state: any) => state.userExercises;

export default userExercisesSlice.reducer;
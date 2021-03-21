import { createSlice } from '@reduxjs/toolkit';

export const userExercisesSlice = createSlice({
    name: 'userExercises',
    initialState: {
        exercises: {}
    },
    reducers: {
        setUserExercises: (state, action) => {
            state.exercises = action.payload
        }
    }
});

export const { setUserExercises } = userExercisesSlice.actions;
export const selectUserExercises = (state: any) => state.exercises;

export default userExercisesSlice.reducer;
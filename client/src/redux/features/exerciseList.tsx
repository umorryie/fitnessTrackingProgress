import { createSlice } from '@reduxjs/toolkit';
interface ExerciseActionSchema {
    payload: string,
    type: string
}
const initialExerciseListState: string[] = [];

export const exerciseListSlice = createSlice({
    name: 'exerciseList',
    initialState: {
        exerciseList: initialExerciseListState
    },
    reducers: {
        setExerciseList: (state, action) => {
            state.exerciseList = action.payload
        },
        addExerciseToExerciseList: (state, action: ExerciseActionSchema) => {
            state.exerciseList = [...state.exerciseList, action.payload];
        },
    }
});

export const { setExerciseList, addExerciseToExerciseList } = exerciseListSlice.actions;
export const selectExerciseList = (state: any) => state.exerciseList;

export default exerciseListSlice.reducer;
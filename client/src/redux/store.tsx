import { configureStore } from '@reduxjs/toolkit'
import userExercisesReducer from './features/userExercises';
import exercisesListReducer from './features/exerciseList';
import userReducer from './features/user';
import activeNavbarReducer from './features/activeNavbar';

export default configureStore({
  reducer: {
    userExercises: userExercisesReducer,
    user: userReducer,
    exerciseList: exercisesListReducer,
    activeNavbar: activeNavbarReducer
  }
})
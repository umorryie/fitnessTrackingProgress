import { configureStore } from '@reduxjs/toolkit'
import userExercisesReducer from './features/userExercises';
import exercisesListReducer from './features/exerciseList';
import userReducer from './features/user';
import activeNavbarReducer from './features/activeNavbar';
import errorReducer from './features/errorHandler';
import friendsReducer from './features/friends';
import allUsersReducer from './features/allUsers';

export default configureStore({
  reducer: {
    userExercises: userExercisesReducer,
    user: userReducer,
    exerciseList: exercisesListReducer,
    activeNavbar: activeNavbarReducer,
    error: errorReducer,
    friends: friendsReducer,
    allUsers: allUsersReducer
  }
})
import { createSlice } from '@reduxjs/toolkit';

export const allUsersSlice = createSlice({
    name: 'friends',
    initialState: {
        allUsers: []
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
    }
});

export const { setAllUsers } = allUsersSlice.actions;
export const selectAllUsers = (state: any) => state.allUsers;

export default allUsersSlice.reducer;
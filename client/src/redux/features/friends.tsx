import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: {
            friendsAddedMySelf: {
                confirmed: [],
                pending: []
            },
            friendsAddedMe: {
                confirmed: [],
                pending: []
            }
        }
    },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload
        },
    }
});

export const { setFriends } = friendsSlice.actions;
export const selectFriends = (state: any) => state.friends;

export default friendsSlice.reducer;
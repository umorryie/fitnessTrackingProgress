import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        cookieID: null,
        sessionID: null
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.email = action.payload
        },
        setUserCookieID: (state, action) => {
            state.cookieID = action.payload
        },
        setUserSessionID: (state, action) => {
            state.sessionID = action.payload
        }
    }
});

export const { setUserEmail, setUserCookieID, setUserSessionID } = userSlice.actions;
export const selectUserEmail = (state: any) => state.email;
export const selectUserCookieID = (state: any) => state.cookieID;
export const selectUserSessionID = (state: any) => state.sessionID;

export default userSlice.reducer;
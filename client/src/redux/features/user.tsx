import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        cookieID: null,
        sessionID: null,
        jwt: null
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
        },
        setJWT: (state, action) => {
            state.jwt = action.payload
        }
    }
});

export const { setUserEmail, setUserCookieID, setUserSessionID, setJWT } = userSlice.actions;
export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
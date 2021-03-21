import { createSlice } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
    name: 'user',
    initialState: {
        activeNavbar: 'Dashboard'
    },
    reducers: {
        setActiveNavbar: (state, action) => {
            state.activeNavbar = action.payload
        }
    }
});

export const { setActiveNavbar } = navbarSlice.actions;
export const selectActiveNavbar = (state: any) => state.activeNavbar;

export default navbarSlice.reducer;
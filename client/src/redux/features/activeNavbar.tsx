import { createSlice } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
    name: 'activeDashboard',
    initialState: {
        activeNavbar: 'Exercises'
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
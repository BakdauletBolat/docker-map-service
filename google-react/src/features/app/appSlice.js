import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        appLoading: true,
        activeEl: 1,
        isActiveModal: false
    },
    reducers: {
        setAppLoading: (state,action) => {
            state.appLoading = action.payload
        },
        setActiveEl: (state, action) => {
            state.activeEl = action.payload
        },
        setIsActiveModal: (state, action) => {
            state.isActiveModal = action.payload
        }
    }
});

export const {setAppLoading,setActiveEl,setIsActiveModal} = appSlice.actions;

export default appSlice.reducer;
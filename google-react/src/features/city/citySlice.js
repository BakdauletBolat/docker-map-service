import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    rurals: [],
    localties: [],
    localty: [],
    polylines: [],
    activePolyline: undefined,
    relevants: [],
    polyLineForm: {
      name: "",
      km: "",
      color: "",
      positionGroup: [],
      road: {}
    }
  },
  reducers: {
    setRurals: (state, action) => {
        state.rurals = action.payload
      },
    setLocalties: (state, action) => {
      state.localties = action.payload
    },
    setLocalty: (state, action) => {
      state.localty = action.payload
    },
    setPolylines: (state, action) => {
      state.polylines = action.payload
    },
    setRelevants: (state, action) => {
      state.relevants = action.payload
    },
    setPolyLineForm: (state,action) => {
      state.polyLineForm = action.payload
    },
    setActivePolyLine: (state, action) => {
      state.activePolyline = action.payload
    } 
  },
})

//export actions
export const { setLocalties, setRurals,setLocalty,setPolylines,setRelevants,setActivePolyLine,setPolyLineForm } = citySlice.actions;

export default citySlice.reducer;
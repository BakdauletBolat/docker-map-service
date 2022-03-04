import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    rurals: [],
    ruralsRaw: [],
    localties: [],
    localtiesRaw: [],
    localty: [],
    polylines: [],
    activePolyline: undefined,
    relevants: [],
    polyLineForm: {
      name: "",
      km: 0,
      color: "#303030",
      positionGroup: [],
      road: {
        beton: 0,
        width: 0,
        hectar: 0,
        goodSituation: 0,
        badSituation: 0,
        yearConstruction: 2000
      }
    }
  },
  reducers: {
    setRurals: (state, action) => {
      state.rurals = action.payload
    },
    setLocalties: (state, action) => {
      state.localties = action.payload
    },
    setRuralsRow: (state, action) => {
      state.ruralsRaw = action.payload
    },
    setLocaltiesRow: (state, action) => {
      state.localtiesRaw = action.payload
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
    setPolyLineForm: (state, action) => {
      state.polyLineForm = action.payload
    },
    setActivePolyLine: (state, action) => {
      state.activePolyline = action.payload
    }
  },
})

//export actions
export const { setLocalties, setRurals, setLocalty, setPolylines, 
               setRelevants, setActivePolyLine, setPolyLineForm,
               setRuralsRow,setLocaltiesRow } = citySlice.actions;

export default citySlice.reducer;
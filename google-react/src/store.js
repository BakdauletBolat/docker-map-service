import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './features/city/citySlice';
import appReducer from './features/app/appSlice';

export default configureStore({
  reducer: {
      city: cityReducer,
      app: appReducer
  },
})
import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mailSlice';
import userReducer from '../features/userSlice';
import settingsReducer from '../features/settingsSlice';

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

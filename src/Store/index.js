import { authReducer } from './authReducer';
import { localStoredReducer } from './localStoredReducer';
import { promiseReducer } from './promiseReduser';
import {configureStore,combineReducers} from '@reduxjs/toolkit';




const reducers = combineReducers({
  promise: promiseReducer,
  auth: localStoredReducer(authReducer, 'auth')
});

export const store = configureStore({  reducer: reducers,});

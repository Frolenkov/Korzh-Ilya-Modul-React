import { authReducer } from './authReducer';
import { localStoredReducer } from './localStoredReducer';
import { promiseReducer } from './promiseReduser';
import {configureStore,combineReducers} from '@reduxjs/toolkit';
import { chatsReducer } from './chatReducer';




const reducers = combineReducers({
  promise: promiseReducer,
  auth: localStoredReducer(authReducer, 'auth'),
  chat: chatsReducer
});

export const store = configureStore({  reducer: reducers,});

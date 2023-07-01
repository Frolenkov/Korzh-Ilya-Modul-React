import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { localStoredReducer } from './localStoredReducer';
import { promiseReducer } from './promiseReduser';
import {configureStore,combineReducers} from '@reduxjs/toolkit';




const reducers = combineReducers({
  promise: localStoredReducer(promiseReducer, 'promise'),
  cart: cartReducer,
  auth: localStoredReducer(authReducer, 'auth')
});

export const store = configureStore({  reducer: reducers,});

import { createBrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { LoginPage } from '../Pages/LoginPage/LoginPage';
import { SecondPage } from '../Pages/SecondPage/SecondPage';
import { ThirdPage } from '../Pages/ThirdPage/ThirdPage';
import { ErrorPage } from '../Pages/ErrorPage/ErrorPage';
import { RegistrationPage } from '../Pages/RegistrationPage/RegistrationPage';
import {ChatPage} from "../Pages/ChatPage/ChatPage"
export const router = createBrowserRouter([
  { path: "/", element: <LoginPage />, },
  { path: "/:loginPages", element: <RegistrationPage />, },
  { path: "/SecondPage", element: <SecondPage />, },
  { path: "/SecondPage/:chatId", element: <ChatPage />, },
  { path: "/ThirdPage/:ThirdPageId", element: <ThirdPage />, },
  { path: "/ThirdPage/:ThirdPageId", element: <ThirdPage />, },
  { path: "*", element: <ErrorPage />, },
]);

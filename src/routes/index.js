import { createBrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { LoginPage } from '../Pages/LoginPage/LoginPage';
import { SecondPage } from '../Pages/SecondPage/SecondPage';
import { ThirdPage } from '../Pages/ThirdPage/ThirdPage';
import { ErrorPage } from '../Pages/ErrorPage/ErrorPage';
import { RegistrationPages } from '../Pages/RegistrationPage/RegistrationPages';

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage />, },
  { path: "/:loginPages", element: <RegistrationPages />, },
  { path: "/SecondPage", element: <SecondPage />, },
  { path: "/chatId", element: <SecondPage />, },
  { path: "/ThirdPage/:ThirdPageId", element: <ThirdPage />, },
  { path: "/ThirdPage/:ThirdPageId", element: <ThirdPage />, },
  { path: "*", element: <ErrorPage />, },
]);

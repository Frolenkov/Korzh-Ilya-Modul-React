import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './AsidePanel.module.css';
import { getUserById } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { actionPromise } from '../../Store/promiseReduser';
import { actionAuthLogout } from '../../Store/authReducer';
import { ChatDescription } from '../ChatDescription/ChatDescription';
import CreateChat from '../CreateChat/CreateChat';
import { chatDelete, installStateChats } from '../../Store/chatReducer';

export const AsidePanel = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stateUserId = useSelector(state => state?.auth?.payload?.sub?.id);
  const state = useSelector(state => state?.promise?.promiseGetUserById);

  const { status, payload } = state || {};
  const chats = payload?.data?.UserFindOne?.chats || [];

  const state1 = useSelector(state => state);
  console.log(state1);

  useEffect(  () => {
    dispatch(actionPromise("promiseGetUserById", getUserById(stateUserId)));
    }, []);




  const exit = () => {
    dispatch(actionAuthLogout());
    navigate("/");
  };

  const reversedChats = [...chats].reverse();

  return (
    <div className={style.AsidePanel}>
      {status === 'PENDING' || !status ? (
        <CircularProgress />
      ) : (
        <>
          <CreateChat />

          <Button  sx={{margin:"20px"}}variant="contained" onClick={exit}>exit</Button>

          {reversedChats.length ? (
            reversedChats.map(chat => (
              <ChatDescription key={chat._id} chat={chat} />
            ))
          ) : (
            <div>net</div>
          )}

        </>
      )}
    </div>
  );
};

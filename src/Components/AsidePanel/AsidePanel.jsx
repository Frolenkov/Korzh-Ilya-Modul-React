import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './AsidePanel.module.css';
import { getUserById, loginUser } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionPromise } from '../../Store/promiseReduser';

import { ChatDescription } from '../ChatDescription/ChatDescription';
import CreateChat from '../CreateChat/CreateChat';
import { addChats } from '../../Store/chatReducer';
import { Exit } from '../Exit/Exit';


export const AsidePanel = () => {

  const dispatch = useDispatch();
  const stateUserId = useSelector((state) => state?.auth?.payload?.sub?.id);
  const state = useSelector((state) => state?.promise?.promiseGetUserById);
  const { status, payload } = state || {};
  const chats = useSelector((state) => state.chat);



  useEffect(() => {
    (async () => {

      const user = await dispatch(actionPromise("promiseGetUserById", getUserById(stateUserId)));
      dispatch(addChats(user.data.UserFindOne.chats));

    })();
  }, []);

  return (<div className={style.AsidePanel}>
      {status === 'PENDING' || !status ?
        (<CircularProgress />) :
        (<>
          <div className={style.StickyContainer}>
            <CreateChat />
            <Exit />
          </div>
          {Object.keys(chats).length ?
            (Object.keys(chats).reverse().map(key => (
              <ChatDescription key={key} chat={chats[key]} />
            ))) :
            (<div>net</div>)}
        </>)}
    </div>);
};

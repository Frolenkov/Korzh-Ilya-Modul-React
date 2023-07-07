import { Avatar, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import style from './AsidePanel.module.css';
import { getUserById, } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { actionPromise } from '../../Store/promiseReduser';
import { actionAuthLogout } from '../../Store/authReducer';

export const AsidePanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stateUserId = useSelector(state => state?.auth?.payload?.sub?.id);

  const state = useSelector(state => state?.promise?.promiseGetUserById);

  const token = useSelector(state => state.auth.token);

  const { status, payload } = state || {};
  const chats = payload?.data?.UserFindOne?.chats;

  useEffect(() => {
    dispatch(actionPromise("promiseGetUserById", getUserById(stateUserId)));
  }, []);


  // const exit = () => {
  //   dispatch(actionAuthLogout());
  //   navigate("/");
  // };



  return status === 'PENDING' || !status ? (<CircularProgress />) : (<div className={style.AsidePanel}>
    {/*<button onClick={exit}>exit</button>*/}
    {chats && chats.length ?
      chats.map(chat => (<Link
        key={chat._id}
        className={style.personNick}
        to={`/SecondPage/${chat._id} `}
      >

        <Avatar alt={chat.members[0].nick} />

        <div className={style.nickAndLastMessage}>
          <span> {chat.members.length > 2 ? "group" : chat.members[0].nick ? chat.members[0].nick : 'Incognito User'}</span>
          <span>{chat.messages[chat.messages.length - 1]} 1</span>
        </div>

      </Link>))
     : <div>net</div>}

  </div>);
};

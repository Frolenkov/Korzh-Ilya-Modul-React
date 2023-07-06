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

  useEffect(() => {
    dispatch(actionPromise("promiseGetUserById", getUserById(stateUserId)));
  }, []);

  const state = useSelector(state => state?.promise?.promiseGetUserById);
  const { status, payload } = state || {};
  const chats = payload?.data?.UserFindOne?.chats;

  console.log(chats);

  const exit = () => {
    dispatch(actionAuthLogout());
    navigate("/");
  };

  const token = useSelector(state => state.auth.token);

  return status === 'PENDING' || !status ? (<CircularProgress />) : (<div className={style.AsidePanel}>
    <button onClick={exit}>exit</button>

    {chats.map(chat => (<Link
      key={chat._id}
      className={style.personNick}
      to={`/${chat._id} `}
    >
      <Avatar alt={chat.members[0].nick} />

      <div className={style.nickAndLastMessage}>
        <span> {chat.members.length > 2 ? "group" : chat.members[0].nick ? chat.members[0].nick : 'Incognito User'}</span>
        <span>{chat.messages[chat.messages.length - 1]} 1</span>
      </div>
    </Link>))}

  </div>);
};

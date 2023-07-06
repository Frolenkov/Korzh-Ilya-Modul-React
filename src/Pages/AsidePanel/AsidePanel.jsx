import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import style from './AsidePanel.module.css';
import { getUserById, } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { actionPromise } from '../../Store/promiseReduser';
import { useParams } from 'react-router';
import { actionAuthLogout } from '../../Store/authReducer';

export const AsidePanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stateUserId = useSelector(state => state?.auth?.payload?.sub?.id);

  // const stated = useSelector(state => state);
  // //console.log(stated);

  useEffect(() => {
    dispatch(actionPromise("promiseGetUserById", getUserById(stateUserId)));
  }, []);

  const state = useSelector(state => state.promise.promiseGetUserById);
  const { status, payload } = state || {};
  const personData = payload?.data?.UserFindOne;
  const { chats } = personData || {};
//console.log(chats);

  const exit = () => {
    dispatch(actionPromise('exit', actionAuthLogout()));
    navigate("/");
  };

  return status === 'PENDING' || !status ? (<CircularProgress />) : (<div className={style.AsidePanel}>
    <button onClick={exit}>exit</button>

    {chats.map(chat => (<Link
      key={chat._id}
      className={style.personNick}
      to={`/SecondPage/${chat._id} `}
    >
    <span> {chat.members.length > 2 ? "group" : chat.members[0].nick ? chat.members[0].nick : 'Incognito User'}</span>
    {/*<span>{chat.messages[chat.messages.length - 1]}</span>*/}
      </Link>))}

  </div>);
};


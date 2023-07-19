import { Link, useLocation } from 'react-router-dom';
import style from '../AsidePanel/AsidePanel.module.css';
import { Avatar } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteChatAction } from '../../Store/chatReducer';
import { useDispatch, useSelector } from 'react-redux';
import { URLWithoutGQL } from '../../constants';

export const ChatDescription = ({ chat }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  // console.log('chat s opisaniyz', chat );
  const login = chat?.members[0]?.login;
  const [isActive, setIsActive] = useState(false);
  const avatar = URLWithoutGQL + "/" + chat?.members[0]?.avatar?.url;

  const chatId = chat?._id;
  const lastMessage = chat?.lastMessage?.text;

  const memberId = useSelector((state) => state?.auth?.payload?.sub?.id);

  const selectedChat = () => {
    setIsActive(true);
  };

  const deleteChat = (memberId, chatId) => {
    dispatch(deleteChatAction(memberId, chatId));
  };

  useEffect(() => {
    setIsActive(location.pathname === `/SecondPage/${chatId}`);
  }, [location.pathname]);

  return (<div onClick={() => selectedChat(chatId)}>
    <Link
      className={`${style.personNick} ${isActive ? style.active : ''}`}
      to={`/SecondPage/${chatId}`}
    >
      <Avatar src={avatar}>{login.slice(0, 2)}</Avatar>
      <div className={style.nickAndLastMessage}>
        <span className={style.login}>{chat.members.length > 2 ? "group" : login} </span>
        {lastMessage ? <span className={style.lastMessage}>{`${lastMessage.slice(0, 8)}...`}</span> : ''}
      </div>
      <DeleteOutlineIcon
        className={style.trashBasket}
        onClick={() => {
          deleteChat(memberId, chatId);
        }}
      />
    </Link>
  </div>);
};



import { Link } from 'react-router-dom';
import style from '../AsidePanel/AsidePanel.module.css';
import { Avatar } from '@mui/material';
import { URLWithoutGQL, URL } from '../../api/gql';
import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { chatDelete } from '../../Store/chatReducer';
import { useDispatch } from 'react-redux';

export const ChatDescription = ({ chat }) => {
  const dispatch = useDispatch();

  const { nick, login, } = chat.members[0];
  const [idChat, setIdChat] = useState('');
  const avatar = URLWithoutGQL + "/" + chat?.members[0]?.avatar?.url;
  const messages = chat?.messages;
  const chatId = chat._id;
  const lastMessage = messages[messages?.length - 1]?.text;


  const selectedChat = (chatId) => {
    setIdChat(chatId);
  };

  const deleteChat = (chatId) => {
    dispatch(chatDelete(chatId));
  };

  return (<div
    onClick={() => {
      selectedChat(chatId);
    }}
  >
    <Link

      className={idChat === chatId ? style.active : style.personNick}
      to={`/SecondPage/${chatId} `}
    >

      <Avatar src={avatar}> {login.slice(0, 2)}< /Avatar>

      <div className={style.nickAndLastMessage}>
        <span> {chat.members.length > 2 ? "group" : nick ? nick : login}</span>
        <span>{messages.length ? lastMessage.slice(0, 12) + '...' : 'Нет сообщений'}</span>

      </div>

      <DeleteOutlineIcon
        className={style.trashBasket}
        onClick={() => {
          deleteChat(chat._id);
        }}
      />

    </Link>
  </div>);
};


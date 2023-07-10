import { Link } from 'react-router-dom';
import style from '../AsidePanel/AsidePanel.module.css';
import { Avatar } from '@mui/material';
import { URLWithoutGQL, URL } from '../../api/gql';
import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const ChatDescription = ({ chat }) => {
  const { nick, login, } = chat.members[0];
  const [idChat, setIdChat] = useState('');
  const avatar = URLWithoutGQL + "/" + chat?.members[0]?.avatar?.url;
  const messages = chat?.messages;
  const lastMessage = messages[messages?.length - 1]?.text;
  console.log(lastMessage);
  const selectedChat = (id) => {
    setIdChat(id);
  };

  const deleteChat = (id) => {

  };

  return (<div
    onClick={() => {
      selectedChat(chat._id);
    }}
  >
    <Link

      className={idChat === chat._id ? style.active : style.personNick}
      to={`/SecondPage/${chat._id} `}
    >

      <Avatar src={avatar}> {login.slice(0, 2)}< /Avatar>

      <div className={style.nickAndLastMessage}>
        <span> {chat.members.length > 2 ? "group" : nick ? nick : login}</span>
        <span>{messages.length ? lastMessage.slice(0,12)+'...': 'Нет сообщений'}</span>

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


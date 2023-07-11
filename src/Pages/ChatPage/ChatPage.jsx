import { AsidePanel } from '../../Components/AsidePanel/AsidePanel';
import style from "./ChatPage.module.css";
import InputChat from '../../Components/Input/InputChat';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/promiseReduser';
import { getChatById } from '../../api';

export const ChatPage = () => {
  const [value, setValue] = useState('');
  const props = useParams();
  const dispatch = useDispatch();

  const stateMessage = useSelector(state => state?.promise?.promiseGetChatById);
  const { status, payload } = stateMessage || {};

  const arrMessages = payload?.data?.ChatFind[0]?.messages;
  const chatId = props.chatId;

  useEffect(() => {
    dispatch(actionPromise('promiseGetChatById', getChatById(chatId)));
  }, [chatId]);

  return (<div className={style.pageWrapper}>
    <AsidePanel />

    <div className={style.chatWrapper}>
      {Array.isArray(arrMessages) && status === 'FULFILLED' ? (arrMessages.map(message => <div key={message._id}>
        <span >{message.text}</span></div>)) : ''}

      <div className={style.inputWrapper}>
        <InputChat
          value={value}
          setValue={setValue}
          text="message"
          sx={{ width: "100%" }}
        />
        <SendIcon fontSize="large" className={style.sendIMG} />

      </div>
    </div>

  </div>);
};

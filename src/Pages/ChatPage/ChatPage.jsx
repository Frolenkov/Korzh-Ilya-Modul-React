import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessagesByChatId } from '../../api';
import { addMessage, addMessages } from '../../Store/chatReducer';
import { actionPromise } from '../../Store/promiseReduser';
import { AsidePanel } from '../../Components/AsidePanel/AsidePanel';
import InputChat from '../../Components/Input/InputChat';
import SendIcon from '@mui/icons-material/Send';
import style from "./ChatPage.module.css";
import { Time } from '../../Components/Time/Time';
import { useChatSocket } from '../../hooks/useChatSocket';

export const ChatPage = () => {
  const [value, setValue] = useState('');
  const [scip, setScip] = useState(5);
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const messages = useSelector(state => state?.chat[chatId]?.messages);
  const userId = useSelector(state => state?.promise?.promiseGetUserById?.payload?.data?.UserFindOne?._id);
  const chat = useSelector(state => state?.chat);
  const userPromise = useSelector(state => state?.promise?.promiseGetUserById);
  const messagePromise = useSelector(state => state?.promise?.messageByChatId);
  const sendMessage = async (value, chatId) => {
    const dataMessage = await dispatch(actionPromise('createMessage', createMessage(chatId, value)));
    // const message = dataMessage?.data?.MessageUpsert;
    // dispatch(addMessage(message, chatId));
    setValue(prevState => prevState='')
  };

  useChatSocket();

  useEffect(() => {

    if (Object.keys(chat).length && userPromise?.status === "FULFILLED") {

      (async () => {

        const dataMessages = await dispatch(actionPromise("messageByChatId", getMessagesByChatId(chatId)));
        const messages = dataMessages?.data?.MessageFind;
        dispatch(addMessages(messages, chatId));
      })();
    }
  }, [chatId, dispatch, userPromise]);

  return (<div className={style.pageWrapper}>
    <AsidePanel />
    <div className={style.chatWrapper}>

      {messages?.length ? (messages.map(message => (<div
        key={message._id}
        className={message.owner?._id !== userId ? style.messageWrapperGuest : style.messageWrapperUser}
      >
        <div
          className={message.owner?._id !== userId ? style.messageGuest : style.messageUser}
        >
          {message.text}
        </div>
        <Time time={message.createdAt} />
      </div>))) : null}

      <div className={style.inputWrapper}>
        <InputChat
          value={value}
          setValue={setValue}
          text="message"
          sx={{ width: "100%" }}
        />
        <SendIcon
          fontSize="large"
          className={style.sendIMG}
          onClick={() => sendMessage(value, chatId)}
        />
      </div>
    </div>
  </div>);
};




















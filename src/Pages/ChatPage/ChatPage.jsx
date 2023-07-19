import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessagesByChatId } from '../../api';
import { addMessages } from '../../Store/chatReducer';
import { actionPromise } from '../../Store/promiseReduser';
import { AsidePanel } from '../../Components/AsidePanel/AsidePanel';
import InputChat from '../../Components/Input/InputChat';
import SendIcon from '@mui/icons-material/Send';
import style from './ChatPage.module.css';
import { Time } from '../../Components/Time/Time';
import { useChatSocket } from '../../hooks/useChatSocket';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import { LIMIT_MESSAGES } from '../../constants';

export const ChatPage = () => {
  const [value, setValue] = useState('');
  const [skipMessages, setSkipMessages] = useState(0);

  const { chatId } = useParams();
  const dispatch = useDispatch();

  const messages = useSelector((state) => state?.chat[chatId]?.messages);
  const userId = useSelector((state) => state?.promise?.promiseGetUserById?.payload?.data?.UserFindOne?._id);
  const userPromise = useSelector((state) => state?.promise?.promiseGetUserById);

  const sendMessage = async (value, chatId) => {
    const dataMessage = await dispatch(actionPromise('createMessage', createMessage(chatId, value)));
    setValue('');
  };

  useChatSocket();

  useEffect(() => {
    if (userPromise?.status === 'FULFILLED') {
      (async () => {
        const dataMessages = await dispatch(actionPromise('messageByChatId', getMessagesByChatId(chatId, skipMessages, LIMIT_MESSAGES)));
        const messages = dataMessages?.data?.MessageFind;
        dispatch(addMessages(messages, chatId));
      })();
    }
  }, [chatId, dispatch, userPromise, skipMessages]);

  const fetchData = async () => {
    setSkipMessages((prevState) => prevState + LIMIT_MESSAGES);
    const dataMessages = await dispatch(actionPromise('messageByChatId', getMessagesByChatId(chatId, skipMessages, LIMIT_MESSAGES)));
    const messages = dataMessages?.data?.MessageFind;
    dispatch(addMessages(messages, chatId));
  };

  console.log(messages);

  return (<div className={style.pageWrapper}>
      <AsidePanel />
      <InfiniteScroll
        dataLength={messages?.length || 0}
        next={fetchData}
        hasMore={true}
        loader={<CircularProgress />}
        style={{ width: '100%' }}
      >
        <div className={style.chatWrapper}>
          {messages?.length ? (messages.map((message) => (<div
                key={message._id}
                className={message.owner?._id !== userId ? style.messageWrapperGuest : style.messageWrapperUser}
              >
                <div
                  className={message.owner?._id !== userId ? style.messageGuest : style.messageUser}
                >
                  {' '}
                  {message.text}{' '}
                </div>
                <Time time={message.createdAt} />
              </div>))) : null}
        </div>
      </InfiniteScroll>
      <div className={style.inputWrapper}>
        <InputChat
          value={value}
          setValue={setValue}
          text="message"
          sx={{ width: '100%' }}
        />
        <SendIcon
          fontSize="large"
          className={style.sendIMG}
          onClick={() => sendMessage(value, chatId)}
        />
      </div>
    </div>);
};

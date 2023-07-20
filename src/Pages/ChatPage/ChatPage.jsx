import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  getCountMessagesByChatId,
  getMessagesByChatId,
} from "../../api";
import { addMessages } from "../../Store/chatReducer";
import { actionPromise } from "../../Store/promiseReduser";
import { AsidePanel } from "../../Components/AsidePanel/AsidePanel";
import InputChat from "../../Components/Input/InputChat";
import SendIcon from "@mui/icons-material/Send";
import style from "./ChatPage.module.css";
import { Time } from "../../Components/Time/Time";
import { useChatSocket } from "../../hooks/useChatSocket";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { LIMIT_MESSAGES } from "../../constants";
import classNames from "classnames";

export const ChatPage = () => {
  const [value, setValue] = useState("");
  const [skipMessages, setSkipMessages] = useState(0);

  const { chatId } = useParams();
  const dispatch = useDispatch();

  const messages = useSelector((state) => state?.chat[chatId]?.messages);
  const userId = useSelector(
    (state) =>
      state?.promise?.promiseGetUserById?.payload?.data?.UserFindOne?._id
  );
  const userPromise = useSelector(
    (state) => state?.promise?.promiseGetUserById
  );
  const messagesCount = useSelector(
    (state) =>
      state?.promise?.promiseCountMessagesByChatId?.payload?.data?.MessageCount
  );
  //console.log(messagesCount);

  const sendMessage = (value, chatId) => {
    const text = value.trim();
    dispatch(actionPromise("createMessage", createMessage(chatId, text)));
    setValue("");
  };

  useChatSocket();

  useEffect(() => {
    setSkipMessages((prevState) => 0);
    if (userPromise?.status === "FULFILLED") {
      (async () => {
        const dataMessages = await dispatch(
          actionPromise(
            "messageByChatId",
            getMessagesByChatId(chatId, 0, LIMIT_MESSAGES)
          )
        );
        const messages = dataMessages?.data?.MessageFind;
        dispatch(addMessages(messages, chatId));
        dispatch(
          actionPromise(
            "promiseCountMessagesByChatId",
            getCountMessagesByChatId(chatId)
          )
        );
      })();
    }
  }, [chatId, dispatch, userPromise]);

  const fetchData = async () => {
    console.log(1);
    setSkipMessages((prevState) => prevState + LIMIT_MESSAGES);
    const dataMessages = await dispatch(
      actionPromise(
        "messageByChatId",
        getMessagesByChatId(
          chatId,
          skipMessages + LIMIT_MESSAGES,
          LIMIT_MESSAGES
        )
      )
    );
    const messages = dataMessages?.data?.MessageFind;
    console.log(messages, "##########")
    dispatch(addMessages(messages, chatId));
  };
  console.log(messages);
  return (
    <div className={style.pageWrapper}>
      <AsidePanel />

      <div className={style.chatWrapper}>
        {messages?.length ? (
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchData}
            hasMore={true}
          >
            {messages.map((message) => (
              <div key={message._id}
                className={classNames(
                  style.messageWrapper,
                  message.owner?._id !== userId
                    ? style.messageWrapperGuest
                    : style.messageWrapperUser
                )}
              >
                <div className={style.messageBody}>
                  <div
                    className={
                      message.owner?._id !== userId
                        ? style.messageGuest
                        : style.messageUser
                    }
                  >
                    {message.text}
                  </div>
                  <Time time={message.createdAt} />
                </div>
              </div>
            ))}
          </InfiniteScroll>
        ) : null}
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
    </div>
  );
};

export const chatsReducer = (state = {}, action) => {

  if (action.type === 'CHATS') {

    const newState = { ...state };

    action.chats.map(chat => {
      newState[chat._id] = chat;
    });

    return newState;
  }

  if (action.type === 'CHAT_DEL') {

    const newState = { ...state };
    delete newState[action.idChat];
    return newState;
  }

  return state;

};

export const installStateChats = (chats) => ({ type: 'CHATS', chats });

export const chatDelete = (idChat) => ({ type: 'CHAT_DEL', idChat });

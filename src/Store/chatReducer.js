export const chatsReducer = (state = {}, action) => {
  if (action.type === 'CHATS') {
    const newState = { ...state };
    action.chats.map(chat => {
      newState[chat._id] = chat;
    });
    return newState;
  }

  if (action.type === 'CHAT_DEL') {
    const chatId = action.chatId;
    const newState = { ...state };
    const chat = newState[chatId];
    const updatedMembers = chat.members.filter(member => member._id !== action.memberId);
    const updatedChat = { ...chat, members: updatedMembers };
    newState[chatId] = updatedChat;
    console.log(newState);
    return newState;
  }

  return state;
};

export const installStateChats = (chats) => ({ type: 'CHATS', chats });
export const addChat = (chat) => ({ type: 'CHATS', chats: [chat] });
export const deleteChatAction = (memberId, chatId) => ({ type: 'CHAT_DEL', memberId, chatId });

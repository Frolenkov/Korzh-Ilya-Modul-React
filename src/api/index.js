import { gql } from './gql';

export const getUserById = (id) => {
  const UserFindOne = `query ($query: String,) {
  UserFindOne(query: $query) {
    _id
    login
    nick
    avatar{url}
    chats{ 
      _id
      lastModified
        lastMessage {
        _id
        createdAt
        text
        media{
          url
        }
      }
      members{
        _id
        login
        nick
        avatar{url}
      }
      
    }
    
  }
}`;
  return gql(UserFindOne, { "query": `[{ "_id": "${id}" }]` });
};
export const getUserByLogin = (login) => {
  const UserFindOne = `query ($query: String,) {
  UserFindOne(query: $query) {
    _id
    login
    nick
    avatar{url}
    chats{ 
      _id
      lastModified
      members{
        _id
        login
        nick
        avatar{url}
      }
      messages{   
        owner{
          _id
          login
          nick
          avatar{url}
        }
        text    
          }
    }
    
  }
}`;
  return gql(UserFindOne, { "query": `[{ "login": "${login}" }]` });
};
export const registrationUser = (login, password, nick) => {
  const UserUpsert = `mutation ($login:String, $password: String, $nick: String){
  UserUpsert(user: {login:$login, password: $password, nick: $nick}){
    _id
    login
    nick
      }
}`;
  return gql(UserUpsert, { "login": login, "password": password, "nick": nick });
};
export const loginUser = (login, password) => {
  const Login = `query ($login: String, $password: String) {
  login(login: $login, password: $password) 
}`;
  return gql(Login, { "login": login, "password": password });
};
export const createChat = (id) => {
  const ChatUpsert = `mutation($chat: ChatInput){
    ChatUpsert(chat:$chat)  {
      _id
      title
      avatar{
        url
      }
      owner{
        login
        nick
      }
      members{_id
        login
        nick
        avatar
        {
          url
        }}
    }
  }`;
  console.log(typeof id);
  return gql(ChatUpsert, {
    "chat": {
      "members": [{
        "_id": `${id}`
      }]
    }
  });

};
export const ChatDelete = (id) => {
  const ChatDelete = `mutation($chat: ChatInput){
    ChatDelete(chat:$chat)  {
      _id
      title
      avatar{
        url
      }
      owner{
        login
        nick
      }
      members{_id
        login
        nick
        avatar
        {
          url
        }}
    }
  }`;
  return gql(ChatDelete, {
    "chat": {
      "members": [{
        "_id": `${id}`
      }]
    }
  });

};
export const createMessage = (chatId, text) => {
  const message = ` mutation($message: MessageInput){
  MessageUpsert(message: $message){
   _id
    text            
    chat{
      createdAt
    lastModified
      
    lastMessage{
      text
      media{url}
          }
      
      members{
        _id
        login
        nick
        avatar{
          url
        }
        
      }
      avatar{
        url
      }
    }    
    media{
      type
url    
    }    
    owner{
      _id
    login
    nick
    avatar{
      url
    }
    }
  }
}`;
  return gql(message,{
    "message": {
      "chat": {
        "_id": chatId

      }, "text": text
    }
  });
};
export const getChatById = (id) => {
  const ChatFind = `query ($query: String){
  ChatFindOne(query: $query){
    _id
    lastModified
    lastMessage{
      owner{
        login
        nick
        avatar{url}
      }
      text
      media{url}
    }
    title
    avatar{url}
    members{
      _id
      login
      nick
      avatar{url}
    }
    messages{
      _id
      owner{
        login
        nick
        avatar{url}
      }
      text
      media{url}
    }
  }
}

`;
  return gql(ChatFind, { "query": `[{ "_id": "${id}" }]`});
};
export const getMessagesByChatId = (chatId, skip,limit) => {
  const MessageFind = `query ($query: String) {
  MessageFind(query: $query) {
    _id
    createdAt
    owner{
      _id
      login
      nick
      avatar{url}
    }
    text
    media{url}
  }
}`;
return gql(MessageFind, { "query": `[{ "chat._id": "${chatId}" }, {  "skip": [${skip}],  "limit": [${limit}]}]` });
};

export const getMessageByMessageId = (messageId) => {
  const MessageFindOne = `query ($query: String) {
  MessageFindOne(query: $query) {
    _id
    createdAt
    owner{
      _id
      login
      nick
      avatar{url}
    }
    text
    media{url}
  }
}`;
  return gql(MessageFindOne, { "query": `[{ "_id": "${messageId}" }]` });
};


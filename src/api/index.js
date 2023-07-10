import { gql } from './gql';
export const getUserById = async (id) => {
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
  return gql(UserFindOne, { "query": `[{ "_id": "${id}" }]` });
};
export const getUserByLogin = async (login) => {
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
export const registrationUser = async (login, password, nick) => {
  const UserUpsert = `mutation ($login:String, $password: String, $nick: String){
  UserUpsert(user: {login:$login, password: $password, nick: $nick}){
    _id
    login
    nick
      }
}`;
  return gql(UserUpsert, { "login": login, "password": password, "nick": nick });
};
export const loginUser = async (login, password) => {
  const Login = `query ($login: String, $password: String) {
  login(login: $login, password: $password) 
}`;
  return gql(Login, { "login": login, "password": password });
};
export const createChat = async (id) => {
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
export const ChatDelete = async (id) => {
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
export const createMessage = async (idChat, text) => {
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
  return gql({
    "message": {
      "chat": {
        "_id": idChat

      }, "text": text
    }
  });
};

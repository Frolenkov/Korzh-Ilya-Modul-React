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

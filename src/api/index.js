import { gql } from './gql';

export const rootCategories = async () => {
  const getCategoryFind = `query ($query: String) {
    CategoryFind(query: $query) {
      _id
      name
    }
  }`;
  return gql( getCategoryFind, { "query": "[{\"parent\": null}]" });
};

export const registrationUser = async (login, password, nick) => {
const UserUpsert =`mutation ($login:String, $password: String, $nick: String){
  UserUpsert(user: {login:$login, password: $password, nick: $nick}){
    _id
    login
    nick
      }
}`
  return gql( UserUpsert, {"login": login,"password": password,"nick": nick});
};



export const loginUser = async (login, password) => {
  const Login =`query ($login: String, $password: String) {
  login(login: $login, password: $password) 
}`
  return gql( Login, {"login": login,"password": password});
};

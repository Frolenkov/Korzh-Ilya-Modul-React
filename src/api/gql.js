export const URL = "http://chat.ed.asmer.org.ua/graphql";
export const URLWithoutGQL = "http://chat.ed.asmer.org.ua";

export  const gql = async ( query, variables) => {
  const data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query, variables }),
  };
  if (localStorage.authToken) {
    data.headers.Authorization = "Bearer " + localStorage.authToken;
  }

  const response = await fetch(URL, data);
  const responseData = await response.json();
  return responseData;
};

const url = "http://shop-roles.node.ed.asmer.org.ua/graphql";

export  const gql = async ( query, variables) => {
  const data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query, variables }),
  };
  if (localStorage.authToken) {
    data.headers.Authorization = "Bearer " + localStorage.authToken;
  }

  const response = await fetch(url, data);
  const responseData = await response.json();
  return responseData;
};

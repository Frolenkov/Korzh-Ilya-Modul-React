const jwtDecode = (token) => {
  try {
    let split = token.split('.', 2);
    return JSON.parse(atob(split[1]));
  } catch (e) {
    alert('Ты не зарегистрирован ');
  }
};

export function authReducer(state = {}, { type, token }) {
  if (token) {
    localStorage.authToken = token;
  }

  if (type === 'AUTH_LOGIN') {
    let payload = jwtDecode(token);
    return {
      token, payload,
    };
  }
  if (type === 'AUTH_LOGOUT') {
    return {};
  }
  return state;
}

export const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token });
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' });




export function localStoredReducer(originalReducer, localStorageKey) {
  let flag = true;

  function wrapper(state, action) {

    if (flag) {
      flag = false;
      const token = localStorage.getItem(localStorageKey);
      try {
        if (token !== '{}' && token !== null) {
          return JSON.parse(token);
        }
      } catch (e) {
        console.log(e);
      }
    }
    const newState = originalReducer(state, action);
    if (typeof newState === 'object' && newState !== null) {
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
    }
    return newState;
  }

  return wrapper;
}

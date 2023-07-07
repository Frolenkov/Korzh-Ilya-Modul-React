// export function localStoredReducer(originalReducer, localStorageKey) {
//   let flag = true;
//
//   function wrapper(state, action) {
//     console.log("state:"state,"action:"action);
//     if (flag) {
//       flag = false;
//       const token = localStorage.getItem(localStorageKey);
//
//       try {
//         if (token !== '{}' && token !== null) {
//           return JSON.parse(token);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     const newState = originalReducer(state, action);
//     console.log(newState);
//     if (typeof newState === 'object' && newState !== null) {
//       localStorage.setItem(localStorageKey, JSON.stringify(newState));
//     }
//     return newState;
//   }
//
//   return wrapper;
// }


export function localStoredReducer(originalReducer, localStorageKey) {
  let firstRun = true

  return function wrapper(state, action) {
    if (firstRun) {
      firstRun = false
      const keyData = localStorage.getItem(localStorageKey)

      if (keyData !== '{}' && keyData !== null) {
        console.log(JSON.parse(keyData));
        return JSON.parse(keyData)
      }
    }

    const newState = originalReducer(state, action)
    console.log("dergaet");
    localStorage.setItem(localStorageKey, JSON.stringify(newState))
    return newState
  }
}

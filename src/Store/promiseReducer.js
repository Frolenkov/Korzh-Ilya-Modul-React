export function promiseReducer(state = {}, { promiseName, type, status, payload, error }) {
  if (type === 'PROMISE') {
    return {
      ...state, [promiseName]: { status, payload, error }
    };
  }
  return state;
}

const actionPending = (promiseName) => ({ type: 'PROMISE', promiseName, status: 'PENDING' });
const actionFulfilled = (promiseName, payload) => ({ type: 'PROMISE', promiseName, status: 'FULFILLED', payload });
const actionRejected = (promiseName, error) => ({ type: 'PROMISE', promiseName, status: 'REJECTED', error });


export const actionPromise = (promiseName, promise) => async dispatch => {
  dispatch(actionPending(promiseName)); //сигналізуємо redux, що проміс почався
  try {
    const payload = await promise; //очікуємо промісу
    dispatch(actionFulfilled(promiseName, payload)); //сигналізуємо redux, що проміс успішно виконано
    return payload; //у місці запуску store.dispatch з цим thunk можна також отримати результат промісу
  } catch (error) {
    dispatch(actionRejected(promiseName, error)); //у разі помилки - сигналізуємо redux, що проміс не склався
  }


};


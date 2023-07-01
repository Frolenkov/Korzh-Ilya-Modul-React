export function promiseReducer(state = {}, { promiseName, type, status, payload, error }) {
  if (type === 'PROMISE') {
    return {
      ...state, [promiseName]: { status, payload, error }
    };
  }
  return state;
}

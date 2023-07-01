export  function cartReducer(state = {}, action) {

  if (action.type === 'CART_ADD') {
    const updatedState = { ...state };
    const { _id } = action.good;

    if (updatedState[_id]) {
      updatedState[_id].count += action.count;
    } else {
      updatedState[_id] = {
        count: action.count, good: action.good,
      };
    }
    return updatedState;
  }

  if (action.type === 'CART_SUB') {

    const updatedState = { ...state };
    const { _id } = action.good;

    if (updatedState[_id]) {
      updatedState[_id].count -= action.count;
    }
    if (updatedState[_id].count < 1) {
      updatedState[_id].count = 0;
    }

    return updatedState;
  }

  if (action.type === 'CART_SET') {
    const updatedState = { ...state };
    const { _id } = action.good;
    if (action.count < 1) {
      delete updatedState[_id];
    }
    if (action.count > 0) {
      updatedState[_id] = { count: action.count, good: action.good };
    }
    return updatedState;
  }

  if (action.type === 'CART_DEL') {
    const updatedState = { ...state };
    const { _id } = action.good;
    delete updatedState[_id];
    return updatedState;
  }

  if (action.type === 'CART_CLEAR') {
    return {};
  }
  return state;
}
const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', count, good });
const actionCartSub = (good, count = 1) => ({ type: 'CART_SUB', count, good });
const actionCartDel = (good) => ({ type: 'CART_DEL', good });
const actionCartSet = (good, count = 1) => ({ type: 'CART_SET', count, good });
const actionCartClear = () => ({ type: 'CART_CLEAR' });


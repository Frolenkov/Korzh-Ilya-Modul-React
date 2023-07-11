import Input from '../Input/Input';
import style from '../AsidePanel/AsidePanel.module.css';
import { Button } from '@mui/material';
import { actionPromise } from '../../Store/promiseReduser';
import { createChat, getUserByLogin } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addChat } from '../../Store/chatReducer';

const CreateChat = () => {
  const [login, setLogin] = useState('');
  const [error, setError] = useState(true);
  const dispatch = useDispatch();

  const dataUserLogin = useSelector(state => state?.promise?.promiseGetUserByLogin?.payload?.data?.UserFindOne);
  const statusUserLogin = useSelector(state => state?.promise?.promiseGetUserByLogin?.status);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {

      setError(true);

      const stateGetUserByLogin = await dispatch(actionPromise("promiseGetUserByLogin", getUserByLogin(login)));
      const id = stateGetUserByLogin?.data?.UserFindOne?._id;
      if (id) {
        const chat = await dispatch(actionPromise("promiseCreateChat", createChat(id)));

      }
    }
  };

  const showError = () => {
    setError(false);
  };

  return (<>
      <Input
        keyPress={handleKeyPress}
        value={login}
        setValue={setLogin}
        text={"Create Chat"}
      />

      {!dataUserLogin && error && statusUserLogin === 'FULFILLED' && (<>
          <span className={style.spanError}>Such user doesn't exist</span>
          <Button
            sx={{ width: "90%" }}
            onClick={showError} variant="contained"
          >Close</Button>
        </>)}
    </>);
};

export default CreateChat;

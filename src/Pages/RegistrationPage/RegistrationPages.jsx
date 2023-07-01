import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/actionPromise';
import { loginUser, registrationUser } from '../../api';
import style from "./RegistrationPage.module.css";

export const RegistrationPages = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [nick, setNick] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector((state) => state.promise);
  const { status, payload } = state?.promiseRegistrationUser || {};

  const handleSubmit = () => {
    dispatch(actionPromise('promiseRegistrationUser', registrationUser(login, password, nick)));
  };

  useEffect(() => {
    if (payload?.data?.UserUpsert) {
      dispatch(actionPromise('loginUserPromise', loginUser(login, password)));
    }
    if (payload?.errors?.length > 0) {
      setShowError(true);
    }


  }, [payload]);


  const token = state?.loginUserPromise?.payload?.data?.login;
  console.log(token);

  const handleAlertClose = () => setShowError(false);


  return (<div className={style.container}>
    <fieldset>
      <label className={style.wrapperInput}>
        Email: <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>
      <label className={style.wrapperInput}>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className={style.wrapperInput}>
        Nick: <input type="text" value={nick} onChange={(e) => setNick(e.target.value)} />

      </label>
      <button onClick={handleSubmit}>Create</button>
      {showError && payload?.errors?.length > 0 && (<div className={style.wrapperError}>
        <span> {payload.errors[0].message}</span>
        {'  '}
        <button onClick={handleAlertClose}>Close</button>
      </div>)}
    </fieldset>

  </div>);
};

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/promiseReduser';
import { loginUser, registrationUser } from '../../api';
import style from "./RegistrationPage.module.css";
import { actionAuthLogin } from '../../Store/authReducer';
import {useNavigate} from 'react-router-dom';

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
      dispatch(actionPromise('promiseLoginUser', loginUser(login, password)));
    }

    if (payload?.errors?.length > 0) {
      setShowError(true);
    }
  }, [payload]);

  const handleAlertClose = () => setShowError(false);

  useEffect(()=>{
    const token = state?.promiseLoginUser?.payload?.data?.login;
    if (token) {
      dispatch(actionAuthLogin(token));
    }
  },[state])



  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth?.token);
  useEffect(()=>{
    if(authState){
      navigate("/SecondPage");
    }
  },[navigate,authState])


  return (<div className={style.container}>
    <fieldset>
      <div className={style.wrapperInput}>
        Email: <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} />
      </div>
      <div className={style.wrapperInput}>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={style.wrapperInput}>
        Nick: <input type="text" value={nick} onChange={(e) => setNick(e.target.value)} />

      </div>
      <button onClick={handleSubmit}>Create</button>
      {showError && payload?.errors?.length > 0 && (<div className={style.wrapperError}>
        <span> {payload.errors[0].message}</span>
        {'  '}
        <button onClick={handleAlertClose}>Close</button>
      </div>)}
    </fieldset>

  </div>);
};

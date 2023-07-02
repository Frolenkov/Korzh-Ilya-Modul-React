import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/promiseReduser';
import { loginUser } from '../../api';
import style from '../RegistrationPage/RegistrationPage.module.css';
import { actionAuthLogin } from '../../Store/authReducer';

export function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // Состояние для отображения ошибки

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(actionPromise('promiseLoginUser', loginUser(login, password)));

  };
  const state = useSelector(state => state?.promise);
  const { status, payload } = state?.promiseLoginUser || {};



  useEffect(() => {
    if (payload?.data?.login === null) {
      setShowError(true);
    }if (payload?.data?.login ) {
      dispatch(actionAuthLogin( payload?.data?.login));
    }
  }, [payload]);

  const handleAlertClose = () => {
    setShowError(false);
  };
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

      <label className={style.wrapperInput}>
        Email: <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>

      <label className={style.wrapperInput}>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button onClick={handleSubmit}>submit</button>

      {status === "FULFILLED" && showError && payload?.data?.login === null && (<div className={style.wrapperError}>
          <span>Please register here if you want to join us </span>
          {'  '}
          <button onClick={handleAlertClose}>Close</button>
        </div>)}

      <Link to="/:registration">Registration</Link>

    </fieldset>
  </ div>);
}

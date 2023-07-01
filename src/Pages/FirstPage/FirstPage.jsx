import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/actionPromise';
import { loginUser } from '../../api';
import style from '../RegistrationPage/RegistrationPage.module.css';

export function FirstPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // Состояние для отображения ошибки

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(actionPromise('loginUserPromise', loginUser(login, password)));

  };
  const state = useSelector(state => state.promise);
  const { status, payload } = state || {};

  console.log(state);

  useEffect(() => {
    if (payload?.data?.login===null) {
      setShowError(true);
    }
  }, [payload]);
  const handleAlertClose = () => {
    setShowError(false); // Закрываем ошибку
  };
  return (<div className={style.container}>
    <fieldset>

      <label className={style.wrapperInput}>
        Email: <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>

      <label className={style.wrapperInput}>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button onClick={handleSubmit}>submit</button>

      {showError && payload?.data?.login===null && (
        <div className={style.wrapperError}>
        <span>Please register here if you want to join us </span>
        {'  '}
        <button onClick={handleAlertClose}>Close</button>
      </div>
      )}

      <Link to="/:registration">Registration</Link>

    </fieldset>
  </ div>);
}

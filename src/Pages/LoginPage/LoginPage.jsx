import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from '../RegistrationPage/RegistrationPage.module.css';
import { actionAuthLogin, fullLogin } from '../../Store/authReducer';
import { Button, TextField } from '@mui/material';
import  { InputPassword } from '../../Components/Input/InputPassword';
import { InputLogin } from '../../Components/Input/InputLogin';

export function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // Состояние для отображения ошибки

  const dispatch = useDispatch();

  const state = useSelector(state => state?.promise);
  const { status, payload } = state?.promiseLoginUser || {};

  const handleSubmit = async () => {
    dispatch (fullLogin(login, password));
    console.log(payload);
    if (payload?.data?.login === null) {
      setShowError(true);
    }
  };

  const handleAlertClose = () => {
    setShowError(false);
  };

  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth?.token);

  useEffect(() => {
    if (authState) {
      navigate("/SecondPage");
    }
  }, [navigate, authState]);

  return (<div className={style.container}>
    <fieldset className={style.wrapperRegisterCard}>



      <InputLogin value={login} setValue={setLogin} text='Email'/>
      <InputPassword password={password}  setPassword={setPassword} />


      <div className={style.wrapperButton}>
        <Button onClick={handleSubmit} variant="contained">Log in</Button>
        <Button href="/:registration"  variant="contained"  >Registration</Button>

      </div>
      {status === "FULFILLED" && showError && payload?.data?.login === null && (<div className={style.wrapperError}>
        <span className={style.error}>Please register here if you want to join us </span>
        {'  '}

        <Button onClick={handleAlertClose} variant="contained">Close</Button>

      </div>)}

    </fieldset>

  </ div>);
}









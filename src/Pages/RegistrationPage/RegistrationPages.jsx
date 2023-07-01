import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/promiseReducer';
import { registrationUser } from '../../api';
import { Input } from '../../Components/Input';

export const RegistrationPages = () => {
  const [login, setLogin] = useState('');
   const [password, setPassword] = useState('');
  const [nick, setNick] = useState('');
  const [toggle, setToggle] = useState(true);

  const dispatch = useDispatch();


  const handleSubmit = () => {
    setToggle(toggle => !toggle);

  };

  const category = useSelector(state => state?.promise.registrationUserPromise);
  const { status, payload } = category || {};


  useEffect(() => {
    if (payload?.errors?.length) {
      console.log(category?.payload.errors[0].message);
      console.log(category?.payload.errors);
    }
    dispatch(actionPromise('registrationUserPromise', registrationUser(login, password,nick)));
  }, [toggle]);





  return (<div>RegistrationPages
      <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" value={nick} onChange={(e) => setNick(e.target.value)} />
      <button onClick={handleSubmit}>button</button>
      {/*{ payload?.errors.length > 0 ? alert(category?.payload.errors[0].message) : ''}*/}

    </div>

  );
};

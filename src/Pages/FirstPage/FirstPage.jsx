import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionPromise } from '../../Store/promiseReducer';
import { loginUser } from '../../api';

export function FirstPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(actionPromise('loginUserPromise', loginUser(login, password)));

  };
  const category = useSelector(state => state.promise);
  console.log(category);

  return (<>
    <input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <input
      type="email"
      placeholder="login"
      value={login}
      onChange={(e) => setLogin(e.target.value)}
    />
    <button onClick={handleSubmit}>submit</button>
    <Link to="/:registration">Registration</Link>
  </>);
}

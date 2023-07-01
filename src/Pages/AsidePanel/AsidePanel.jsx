import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import style from './AsidePanel.module.css';
import { rootCategories } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionPromise } from '../../Store/actionPromise';
import { useParams } from 'react-router';


export const AsidePanel = () => {


  const props =useParams()
  console.log(props);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionPromise("category", rootCategories()));
  }, []);

  const category = useSelector(state => state.promise.category);


  const { status, payload } = category || {};

  return status === 'PENDING' || !status ? (<CircularProgress />) : (

    <div className={style.AsidePanel}> {payload?.data?.CategoryFind.map(category => <Link
      className={style.category}
      key={Math.random()}
      to={`/SecondPage/${category._id}`}
    >
      {category.name}
    </Link>)

    } </div>);
};


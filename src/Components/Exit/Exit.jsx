import { Button } from '@mui/material';
import { actionAuthLogout } from '../../Store/authReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const Exit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exit = () => {
    dispatch(actionAuthLogout());
    navigate("/");
  };
  return (<Button sx={{ margin: "20px" }} variant="contained" onClick={exit}>exit</Button>);
};

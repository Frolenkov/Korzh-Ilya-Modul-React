import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)`
  label {
    color: #0f7dc6;
  }

  .MuiInputBase-input {
    color: #0f7dc6; 
  }
`;

export function Input({ keyPress, value, setValue, text }) {
  return (
    <StyledTextField
      id="outlined-basic"
      label={text}
      variant="outlined"
      value={value}
      onKeyPress={keyPress}
      onChange={(e) => setValue(e.target.value)}
      id="outlined-adornment-login"
      type="text"
      size="small"
      placeholder="login"
      sx={{
        boxShadow: '0 0 5px 5px rgba(29, 162, 216, 0.2)',
        mt: '10px',
        borderRadius: '5px',
      }}
    />
  );
}

export default Input;

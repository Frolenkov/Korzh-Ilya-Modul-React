import { AsidePanel } from '../../Components/AsidePanel/AsidePanel';
import style from "./ChatPage.module.css";
import InputChat from '../../Components/Input/InputChat';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export const ChatPage = () => {
  const [value, setValue] = useState('');
  return (<div className={style.pageWrapper}>
      <AsidePanel />

      <div className={style.chatWrapper}>
        <div className={style.inputWrapper}>

          <InputChat
            value={value}
            setValue={setValue}
            text="message"
            sx={{ width: "100%" }}
          />
          <SendIcon fontSize="large"  className={style.sendIMG}/>

        </div>
      </div>

    </div>);
};

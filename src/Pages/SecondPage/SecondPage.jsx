import { AsidePanel } from '../../Components/AsidePanel/AsidePanel';
import { useParams } from 'react-router';
import style from "./SecondPage.module.css"
import InputAdornments from '../../Components/InputPassword';
export const SecondPage=()=>{
const props =useParams()
  console.log(props);
  return(
    <div className={style.wrapperPage}>
      <AsidePanel />
        </div>
  )
}

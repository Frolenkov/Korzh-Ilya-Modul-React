import { AsidePanel } from '../AsidePanel/AsidePanel';
import { useParams } from 'react-router';

export const SecondPage=()=>{
const props =useParams()
  console.log(props);
  return(
    <div>

      <AsidePanel />
    </div>
  )
}

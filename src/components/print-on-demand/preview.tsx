import CanvasApp from './canvas'
import { Overlay } from './design-preview'

import './print-on-demand.css';

const Preview = ({preferred, fill}:any) => {
  return (
    <div className=''>
    <CanvasApp preferred={preferred} fill={fill}/>
    <Overlay />
    </div>
  )
}

export default Preview
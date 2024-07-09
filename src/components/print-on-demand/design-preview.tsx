import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { useEffect } from 'react'

export function Overlay() {
  const snap = useSnapshot(state)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }


  return (
    <div className="overlay-container">
      {/* <AnimatePresence> */}
        {/* <motion.section key="custom" {...config}> */}
          <Customizer />
        {/* </motion.section> */}
      {/* </AnimatePresence> */}
    </div>
  )
}

function Customizer() {
  const snap = useSnapshot(state)

  return (
    <div style={{ background: state?.color }} className='flex items-center justify-between px-3'>
      <div className="color-options">
        {snap.colors.map((color: string) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}
      </div>
      {/* <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal: any) => (
            <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
              <img src={decal + '_thumb.png'} alt="brand" />
            </div>
          ))}
        </div>
      </div> */}
      <button
        className="flex gap-2 p-3 rounded"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document?.querySelector('canvas' as any)?.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      {/* <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button> */}
    </div>
  )
}

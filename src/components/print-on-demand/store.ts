import { proxy } from 'valtio'
const preferred = 'https://res.cloudinary.com/spetsnaz/image/upload/v1717930214/pikaso_texttoimage_hand-crafted-artworks_2_z43oqd.svg'

const state:any = proxy({
  intro: false,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs', 'generated'],
  color: '#EFBD4E',
  decal: 'generated'
})

export { state }

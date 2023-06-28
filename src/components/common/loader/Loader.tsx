import { WizerLogoForLoader } from '../../../assets/svgs/svg-components'
import './Loader.css'

const Loader = () => {
  return (
    <div className="LoaderWrapper">
      <div className="Loader">
        <WizerLogoForLoader />
      </div>
      <div className="BouncingLoader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader

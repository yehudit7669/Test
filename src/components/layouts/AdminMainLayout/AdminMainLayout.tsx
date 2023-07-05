import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Fade from '@mui/material/Fade'
import { WizerLogoWithName } from '../../../assets/svgs/svg-components'
import './AdminMainLayout.css'

interface Props {
  window?: () => Window
  children?: React.ReactElement
}

function ScrollTop(props: Props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  )
}

const AdminMainLayout = (props: Props) => {
  return (
    <div className="AppBarContainer">
      <>
        <AppBar className="AdminAppBar" elevation={0}>
          <Toolbar className="ToolBarWrapper | dflex-spaceBetween">
            <Box>
              <WizerLogoWithName />
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />

        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </>
    </div>
  )
}

export default AdminMainLayout

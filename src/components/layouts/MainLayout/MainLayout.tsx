import { Outlet } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Avatar, TextField, IconButton } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Fade from '@mui/material/Fade'
import { WizerLogoWithName } from '../../../assets/svgs/svg-components'
import './MainLayout.css'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children?: React.ReactElement
}

function ScrollTop(props: Props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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

const MainLayout = (props: Props) => {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <>
        <CssBaseline />
        <AppBar>
          <Toolbar className="ToolBarWrapper | dflex-spaceBetween">
            <Box>
              <WizerLogoWithName />
            </Box>
            <Box className="AccessibilityContainer | dflex-spaceBetween">
              <Avatar>H</Avatar>
              <TextField
                placeholder="Enter class code"
                label=""
                variant="standard"
              />
              <IconButton>Go</IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container>
          <Outlet />
        </Container>
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
    </div>
  )
}

export default MainLayout

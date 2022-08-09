import { createTheme } from '@mui/material/styles'

import palette from './palette'

const theme = createTheme({
  palette: { ...palette.light, mode: 'light' },
})

export default theme

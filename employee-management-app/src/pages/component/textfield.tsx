import React, { useState } from 'react'

import { Box, Paper, Typography } from '@mui/material'

import CurrencyTextField from '@/features/component/CurrencyTextField'

const TextFieldPage = () => {
  const [value, setValue] = useState('')

  return (
    <Paper>
      <Box p={3}>
        <Typography sx={{ mb: 3 }}>Currency Textfield</Typography>
        <CurrencyTextField
          value={value}
          label="Price"
          currencySymbol="S$"
          variant="outlined"
          onChange={(e, value) => setValue(value)}
        />
      </Box>
    </Paper>
  )
}

export default TextFieldPage

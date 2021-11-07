import { Box } from '@mui/system'
import React from 'react'

const Home = () => {

  return (
    <Slide direction="right" in={true} timeout={500}>
      <Box sx={{ mb: 25 }}>
        <h1>Welcome!</h1>
      </Box>
    </Slide>
  )
}

export default Home

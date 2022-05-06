import React from 'react'
import{Box, Grid, Typography} from "@mui/material"
const Review = ({product}) => {
  return (
    <Box>
<Grid container spacing={2} mt={3} justifyContent="space-between">
<Grid item xs={12} sm={12} md={6} bgcolor="primary">
  <Typography variant="h6" component="h2" color="primary">Reviews</Typography>
</Grid>
<Grid item  xs={12} sm={12} md={6}>1234</Grid>
</Grid>
    </Box>
  )
}

export default Review
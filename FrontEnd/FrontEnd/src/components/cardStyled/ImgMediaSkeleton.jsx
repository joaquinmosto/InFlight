import { Card, CardContent, Skeleton } from '@mui/material'
import React from 'react'

const ImgMediaSkeleton = () => {
  return (
    <Card sx={{borderRadius:'20px'}} /* sx={{ width: 450, height:500}} */>
    <Skeleton sx={{borderTopLeftRadius:"20px", borderTopRightRadius:"20px", maxWidth:'450px'}} variant="rectangular" width={450}  height={250}/* width={450} height={450}  *//* height={500} *//>
    <CardContent>
      <Skeleton variant="rounded" width={170}/>
      <Skeleton variant="text" sx={{fontSize:'1rem'}}/>
      <Skeleton variant="rounded" /* width={90} */ sx={{maxWidth:'110px', borderRadius:'15px', height:'40px', margin:'0 auto', marginTop:'1rem'}}/>
    </CardContent>
  </Card>
  )
}

export default ImgMediaSkeleton
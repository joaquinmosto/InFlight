import React, { useState } from 'react';
import { Box, Grid, Card, CardMedia, Modal, Backdrop, Fade } from '@mui/material';


export const Galeria = ({imagenes}) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (ruta) => {
        setSelectedImage(ruta);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedImage(null);
        setOpen(false);
    };
  return (
    <Box className="galeria" sx={{ gap: 1 }}>
    <Grid container spacing={1} className='d-flex align-items-start'>
        {imagenes.slice(1, 5).map((imagen, index) => (
            <Grid item xs={6} key={index}>
                <Card variant="outlined" sx={{ height: 1/2 }} onClick={() => handleOpen(imagen?.ruta)}>
                    <CardMedia component="img"  image={imagen?.ruta} alt="" />
                </Card>
            </Grid>
        ))}
    </Grid>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Fade in={open}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxWidth: '90%',
                    maxHeight: '90%',
                    overflow: 'auto',
                }}
            >
                <img src={selectedImage} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Box>
        </Fade>
    </Modal>
</Box>
  )
}

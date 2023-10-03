import styles from "./Footer.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FacebookShareButton,WhatsappShareButton,WhatsappIcon, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon } from "react-share";
import Stack from '@mui/material/Stack';

function Footer() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '8px solid #000',
    boxShadow: 20,
    p: 1,
  };
  
  const style1 = {
      
      width: 50,
      bgcolor: 'background.paper',
      border: '2px solid #1000',
      boxShadow: 4,
    
      
     
  
    };
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
    <div className={styles.div}>
      <div className={styles.contenedor}>
        <img className={styles.img} src="/logoblanco.png" alt="iso logotipo" />
        <p>© InFlight 2023</p>
        </div>
        <div className={styles.compartir}>
<Button sx={style1}
className={style.compartirBtn}
 onClick={handleOpen}>

<img src="/icono_compartir.png" alt="icono" style={{
          height: "70%",
          width:"70%"



        }}/>
  </Button>
<Modal 
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Stack spacing={2} direction="row">
    <FacebookShareButton url={window.location}>
  <FacebookIcon size= {40} round= {true}/>
  </FacebookShareButton>

  <WhatsappShareButton url={window.location}>
  <WhatsappIcon size= {40} round= {true}/>
  </WhatsappShareButton>

  <TwitterShareButton url={window.location}>
  <TwitterIcon size= {40} round= {true}/>
  </TwitterShareButton>

  <LinkedinShareButton url={window.location}>
  <LinkedinIcon size= {40} round= {true}/>
  </LinkedinShareButton>

  <PinterestShareButton url={window.location}>
  <PinterestIcon size= {40} round= {true}/>
  </PinterestShareButton>

  </Stack>
    
  </Box>
</Modal>
</div>

      {/* </div> */}
    </div>



</>
  );
}

export default Footer;

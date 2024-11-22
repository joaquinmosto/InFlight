import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu({ handleLogout, role, username, handleInitials }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Configuración de cuenta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 40, height: 40, border: '1px solid rgb(0, 137, 254)',
                        color: 'white' }}>{handleInitials()}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundColor: '#212529',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '8px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {//Botón para ver tu usuario
                }
                <MenuItem onClick={() => {
                    handleClose()
                    navigate(`/profile/${username}`)
                }}>
                    <Avatar /> Perfil
                </MenuItem>
                <Divider />
                {//Botón para administración
                }
                {role == "ADMIN" &&
                    <MenuItem onClick={() => {
                        handleClose()
                        navigate("/administracion")
                    }}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Administración
                    </MenuItem>
                }
                {//Botón para cerrar sesión
                }
                <MenuItem onClick={() => {
                    handleLogout()
                    location.replace('/home')
                }}>
                    <ListItemIcon >
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
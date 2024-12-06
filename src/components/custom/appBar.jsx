import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box } from '@mui/material';
import { signOut } from '../../services/authentication'; 

const AppBarComponent = ({ title, id, onDelete }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="voltar"
                    onClick={() => navigate("/")}
                    sx={{
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        zIndex: 1
                    }}
                >
                    {title}
                </Typography>

                {id && (
                    <Box
                        sx={{
                            display: 'flex',
                            position: 'absolute',
                            right: '1.5em'
                        }}
                    >
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="deletar"
                            onClick={onDelete}
                            sx={{
                                position: 'relative',
                                zIndex: 2
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}

                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="sign out"
                    onClick={signOut} 
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        marginLeft: 'auto'
                    }}
                >
                    <LogoutIcon /> 
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
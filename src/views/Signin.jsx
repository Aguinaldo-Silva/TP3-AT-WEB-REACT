import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import logo from '../assets/img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authentication";
import { useState } from "react";
import { handleChange } from "../utils/core";

const SignIn = () => {
    const navigate = useNavigate();
    const { showAlertMessage, translate } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: {
            value: "",
            error: null,
            helperText: null
        },
        password: {
            value: "",
            error: null,
            helperText: null
        },
    });

    const verifyLogin = async () => {
        try {
            setLoading(true);
            const { data: response, error } = await signIn(data.email.value, data.password.value);

            if (error) {
                showAlertMessage("Email ou senha inválidos", "error");
            } else {
                showAlertMessage("Login realizado com sucesso!", "success");
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            showAlertMessage("Erro ao fazer login", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ height: '100vh', paddingTop: 8 }}>
            <Grid sx={styles.boxAdjustment} container>
                <Grid sx={styles.centerBox} item size={{ xs: 12 }}>
                    <Avatar sx={{ width: 180, height: 180 }} src={logo} />
                </Grid>
                <Grid sx={{ ...styles.centerBox, ...styles.marginTop }} item size={{ xs: 12 }}>
                    <Typography variant="h3">Login</Typography>
                </Grid>
                <Grid sx={styles.centerBox} item size={{ xs: 12 }}>
                    <Typography variant="h5">{translate('welcome')}</Typography>
                </Grid>
                <Grid sx={styles.marginTop} item size={{ xs: 12 }}>
                    <TextField
                        label="E-mail"
                        fullWidth
                        onChange={(event) => handleChange(data, setData, event.target.value, "email")}
                        value={data.email.value}
                        disabled={loading}
                    />
                </Grid>
                <Grid sx={styles.marginTop} item size={{ xs: 12 }}>
                    <TextField
                        label="Senha"
                        fullWidth
                        type="password"
                        onChange={(event) => handleChange(data, setData, event.target.value, "password")}
                        value={data.password.value}
                        disabled={loading}
                    />
                </Grid>
                <Grid sx={{ ...styles.centerBox, ...styles.marginTop }} item size={{ xs: 12 }}>
                    <Link to="/signup">Cadastrar</Link>
                </Grid>
                <Grid sx={styles.marginTop} item size={{ xs: 12 }}>
                    <Button
                        fullWidth
                        onClick={verifyLogin}
                        disabled={loading}
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2
                        }}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

const styles = {
    centerBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxAdjustment: {
        padding: 2
    },
    marginTop: {
        marginTop: 4
    }
}

export default SignIn;
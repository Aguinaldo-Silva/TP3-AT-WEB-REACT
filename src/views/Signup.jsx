import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import logo from '../assets/img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authentication";
import { useState } from "react";
import { handleChange } from "../utils/core";
import { validateEmail, validPassword } from "../utils/validators";

const SignUp = () => {
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
        confirm_password: {
            value: "",
            error: null,
            helperText: null
        },
    });

    const verifyRegister = async () => {
        try {
            setLoading(true);
            const emailValidation = validateEmail(data.email.value);
            const passwordValidation = validPassword(data.password.value);

            setData((v) => ({
                ...v,
                email: {
                    value: v.email.value,
                    error: emailValidation.error,
                    helperText: emailValidation.helperText
                },
                password: {
                    value: v.password.value,
                    error: passwordValidation.error,
                    helperText: passwordValidation.helperText
                }
            }));

            if (emailValidation.error || passwordValidation.error) {
                return;
            }

            if (data.password.value !== data.confirm_password.value) {
                showAlertMessage("As senhas não coincidem", "error");
                return;
            }

            const { data: response, error } = await signUp(data.email.value, data.password.value);

            if (error) {
                if (error.message === "User already registered") {
                    showAlertMessage("Usuário já registrado", "error");
                } else {
                    showAlertMessage(error.message, "error");
                }
            } else {
                showAlertMessage("Usuário criado com sucesso!", "success");
                setTimeout(() => {
                    navigate("/signin");
                }, 1000);
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            showAlertMessage("Erro ao criar usuário", "error");
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
                    <Typography variant="h3">{translate('signup')}</Typography>
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
                        error={data.email.error}
                        helperText={data.email.helperText}
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
                        error={data.password.error}
                        helperText={data.password.helperText}
                        disabled={loading}
                    />
                </Grid>
                <Grid sx={styles.marginTop} item size={{ xs: 12 }}>
                    <TextField
                        label="Confirmar Senha"
                        fullWidth
                        type="password"
                        onChange={(event) => handleChange(data, setData, event.target.value, "confirm_password")}
                        value={data.confirm_password.value}
                        disabled={loading}
                    />
                </Grid>
                <Grid sx={{ ...styles.centerBox, ...styles.marginTop }} item size={{ xs: 12 }}>
                    <Link to="/signin">{translate('signin')}</Link>
                </Grid>
                <Grid sx={styles.marginTop} item size={{ xs: 12 }}>
                    <Button
                        fullWidth
                        onClick={verifyRegister}
                        disabled={loading}
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2
                        }}
                    >
                        {loading ? translate('creating') : translate('create')}
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

export default SignUp;
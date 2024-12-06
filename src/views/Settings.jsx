import { useAppContext } from "../Context";
import { AppBar, Grid } from "../components";
import { FormControl, InputLabel, MenuItem, Select, Paper, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { signOut } from "../services/authentication";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const { translate, changeLanguage, showAlertMessage } = useAppContext();
    const [babyData, setBabyData] = useState({
        name: '',
        weight: '',
        length: ''
    });

    useEffect(() => {
        const savedBabyData = localStorage.getItem('babyData');
        if (savedBabyData) {
            setBabyData(JSON.parse(savedBabyData));
        }
    }, []);

    const handleLanguageChange = (event) => {
        changeLanguage(event.target.value);
    };

    const handleBabyDataChange = (field, value) => {
        setBabyData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        localStorage.setItem('babyData', JSON.stringify(babyData));
        showAlertMessage(translate('dataSaved'), 'success');
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <>
            <AppBar title={translate('settings')} />
            <Grid
                container
                sx={{
                    padding: '1em',
                    position: 'relative',
                    minHeight: 'calc(100vh - 64px)'
                }}
            >
                <Grid item xs={12}>
                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="language-select-label">
                                {translate('language')}
                            </InputLabel>
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={localStorage.getItem('language') || navigator.language.split('-')[0]}
                                label={translate('language')}
                                onChange={handleLanguageChange}
                            >
                                <MenuItem value="pt">Português</MenuItem>
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="es">Español</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>

                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label={translate('babyName')}
                            value={babyData.name}
                            onChange={(e) => handleBabyDataChange('name', e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            label={translate('babyWeight')}
                            value={babyData.weight}
                            onChange={(e) => handleBabyDataChange('weight', e.target.value)}
                            type="number"
                            InputProps={{
                                endAdornment: 'kg'
                            }}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            label={translate('babyLength')}
                            value={babyData.length}
                            onChange={(e) => handleBabyDataChange('length', e.target.value)}
                            type="number"
                            InputProps={{
                                endAdornment: 'cm'
                            }}
                        />
                    </Paper>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ marginBottom: 2 }}
                    >
                        {translate('save')}
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            minWidth: '120px'
                        }}
                    >
                        {translate('logout')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Settings;
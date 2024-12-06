import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Grid, Avatar, Box, Typography, CardNewItem, CustomList } from "../components";
import babyImage from '../assets/img/baby.png';
import { useAppContext } from "../Context";

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/actions";
import { list } from "../services/database";

const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { translate } = useAppContext();
    const [data, setData] = useState([]);
    const [babyData, setBabyData] = useState({
        name: '',
        weight: '',
        length: ''
    });

    const loadData = () => {
        const d = list();
        if (d) {
            setData(d);
        }
    }

    useEffect(() => {
        loadData();
      
        const savedBabyData = localStorage.getItem('babyData');
        if (savedBabyData) {
            setBabyData(JSON.parse(savedBabyData));
        }
    }, []);

    return (
        <Grid container>
            <Grid
                size={{ xs: 12 }}
                sx={{
                    height: '25vh'
                }}
            >
                <Grid
                    container
                    sx={{
                        alignItems: 'flex-end',
                        marginTop: '1em'
                    }}
                >
                    <Grid size={{ xs: 4 }}>
                        <Box
                            sx={{
                                ...styles.centerBox,
                                ...styles.centerBox
                            }}
                        >
                            <IconButton
                                sx={{
                                    ...styles.iconButton,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                                onClick={() => navigate("/dashboard")}
                            >
                                <SignalCellularAltIcon
                                    sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }}
                                />
                            </IconButton>
                            <Box sx={{
                                ...styles.centerBox,
                                ...styles.boxText
                            }}>
                                <Typography component="p" sx={{ ...styles.text2 }}>
                                    {babyData.length || '0'} cm
                                </Typography>
                                <Typography component="p" sx={{ ...styles.text3 }}>
                                    {translate('length')}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Box
                            sx={{
                                ...styles.centerBox
                            }}
                        >
                            <Avatar
                                sx={{ width: 90, height: 90 }}
                                src={babyImage}
                            />
                            <Box sx={{
                                ...styles.centerBox,
                                ...styles.boxText
                            }}>
                                <Typography component="p" sx={{ ...styles.text1 }}>
                                    {babyData.name || translate('baby')}
                                </Typography>
                                <Typography component="p" sx={{ ...styles.text3 }}>
                                    {translate('days')}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Box
                            sx={{
                                ...styles.centerBox
                            }}
                        >
                            <IconButton
                                sx={{
                                    ...styles.iconButton,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                                onClick={() => navigate("/settings")}
                            >
                                <SettingsIcon
                                    sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }}
                                />
                            </IconButton>
                            <Box sx={{
                                ...styles.centerBox,
                                ...styles.boxText
                            }}>
                                <Typography component="p" sx={{ ...styles.text2 }}>
                                    {babyData.weight || '0'} kg
                                </Typography>
                                <Typography component="p" sx={{ ...styles.text3 }}>
                                    {translate('weight')}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                size={{ xs: 12 }}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: '75vh'
                }}
            >
                <Grid
                    container
                    sx={{
                        marginTop: '-50px',
                        padding: 2
                    }}
                >
                    <Grid size={{ xs: 12 }} item>
                        <Grid container spacing={2}>
                            {ACTIONS.map((action, index) => (
                                <Grid size={{ xs: 4 }} key={index}>
                                    <CardNewItem
                                        title={action.title}
                                        Icon={action.Icon}
                                        color={action.color}
                                        actionType={action.actionType}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            container
                            sx={{
                                marginTop: '1em'
                            }}
                        >
                            <Grid size={{ xs: 12 }}>
                                {data ? (
                                    <CustomList
                                        sx={{
                                            overflow: 'auto',
                                            maxHeight: '56.5vh'
                                        }}
                                        items={data}
                                    />
                                ) : null}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    icon: {
        fontSize: '1.5em'
    },
    boxText: {
        marginTop: '.5em'
    },
    text1: {
        wordBreak: 'break-all',
        fontSize: '1.2em',
        fontWeight: '500',
        fontFamily: '"Lato", sans-serif',
    },
    text2: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '600',
        fontFamily: '"Lato", sans-serif',
    },
    text3: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '400',
    }
}

export default Home;
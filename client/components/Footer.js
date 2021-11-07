import React from "react";
import { Paper, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Copyright = () => {
    return (
        <Typography variant="body1" align='center'>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/LunasCodingDiary/LetterboxdPlus" target="_blank">
                LETTERBOXD PLUS
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}
const Footer = () => {
    return (
        <Paper square sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
            left: "0",
            bottom: "0",
            width: "100%",
            zIndex: '1',
            py: 3,
            px: 2,
            borderTop: 'solid 1px black'
        }}>
            <IconButton color='primary' href="https://github.com/LunasCodingDiary/LetterboxdPlus" target="_blank">
                <GitHubIcon sx={{ height: 30, width: 30 }} />
            </IconButton>
            <Typography sx={{ mt: 1 }}>
                Developed By Luna
            </Typography>
        </Paper>
    )
}
export default Footer
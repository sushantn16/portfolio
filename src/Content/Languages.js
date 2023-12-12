import React, { forwardRef } from 'react';
import { Chip } from "@mui/material";
import Container from "../Container";

const Languages = forwardRef((props, ref) => {

    const languages = [
        "English",
        "Hindi",
        "Punjabi",
        "German"
    ];

    return (
        <div ref={ref} name="languages">
        <Container>
            {languages.map(lang => (
                <Chip label={lang} variant="outlined"  sx={{ bgcolor: 'black', color: 'white', margin: '5px', padding: '3px' }}/>
            ))}
        </Container>
        </div>
    );
});
export default Languages;
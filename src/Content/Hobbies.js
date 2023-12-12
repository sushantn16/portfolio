import React, { forwardRef } from 'react';
import { Chip } from "@mui/material";
import Container from "../Container";

const Hobbies = forwardRef((props, ref) => {

    const hobbies = [
        "Running",
        "Cooking",
        "Reading"
    ];

    return (
        <div ref={ref} name="hobbies">
        <Container>
            {hobbies.map(hobby => (
                <Chip label={hobby} variant="outlined"  sx={{ bgcolor: 'black', color: 'white', margin: '5px', padding: '3px' }}/>
            ))}
        </Container>
        </div>
    );
});


export default Hobbies;
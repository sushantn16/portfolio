import React, { forwardRef } from 'react';
import Container from '../Container';

const Skills = forwardRef((props, ref) => {

    return (
        <div ref={ref} name="skills">
            <Container>
                Skills
            </Container>
        </div>
    )

});
export default Skills;
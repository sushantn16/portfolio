import React, { forwardRef } from 'react';
import Container from '../Container';
import Cards from '../Cards';

const Education = forwardRef((props, ref) => {
    console.log(ref, props);
    const education = [
        {
            "id": 1,
            "name": "Masters of Science in Web and Data Science",
            "organisation": "University of Koblenz",
            "city": "Koblenz",
            "country": "Germany",
            "duration": "10/2022 – Present",
            "description": "Currently Enrolled"
        },
        {
            "id": 2,
            "name": "Bachelor of Technology in Computer Science and Engineering",
            "organisation": "Kurukshetra University",
            "city": "Kurukshetra",
            "country": "India",
            "duration": "08/2016 – 09/2020",
            "description": "Currently Enrolled"
        }
    ];

    return (
        <div ref={ref} name="education">
            <Container>
                {education.map(edu => (
                    <Cards item={edu}/>
                ))}
            </Container>
        </div>
    );
});

export default Education;

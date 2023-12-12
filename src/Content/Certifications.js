import React, { forwardRef } from 'react';
import Container from '../Container';
import Cards from '../Cards';

const Certifications = forwardRef((props, ref) => {

    const certifications = [
        {
            "id": 1,
            "name": "Certified SAFe® 5 Practitioner",
            "organisation": "",
            "date": "",
            "href": ""
        },
        {
            "id": 2,
            "name": "Azure AI Fundamentals",
            "organisation": "Microsoft",
            "date": "",
            "href": ""
        },
        {
            "id": 3,
            "name": "Introduction to Cloud Computing",
            "organisation": "IBM",
            "date": "",
            "href": ""
        },
        {
            "id": 4,
            "name": "Agile Software Development",
            "organisation": "University of Minnesota",
            "date": "",
            "href": ""
        },
        {
            "id": 5,
            "name": "Front-End Web UI Frameworks and Tools",
            "organisation": "Hong Kong University of Science and Technology",
            "date": "",
            "href": ""
        }
    ];

    return (
        <div ref={ref} name="certifications">
        <Container>
            {certifications.map(cert => (
                <Cards item={cert}/>
            ))}
        </Container>
        </div>
    );

});
export default Certifications;
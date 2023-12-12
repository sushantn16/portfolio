import React, { forwardRef } from 'react';
import Container from '../Container';
import Cards from '../Cards';

const Projects = forwardRef((props, ref) => {

    const projects = [
        {
            "id": 1,
            "name": "LifeOfSushant",
            "organisation": "",
            "city": "",
            "country": "",
            "duration": "07/2023 – present",
            "description": "LifeOfSushant is an ongoing personal blog website where I curate and share my life experiences, tech insights, and interests.•Created and curated by a passionate software developer with a flair for writing.•Platform designed to offer diverse content, including technology-related topics and personal reflections. •Aims to engage and connect with a like-minded audience.•Provides valuable insights and stories to inspire and entertain readers.",
            "technologies-used": "NextJS, TailwingCSS, Vercel Cloud."
        },
        {
            "id": 2,
            "name": "AmaCart",
            "organisation": "",
            "city": "",
            "country": "",
            "duration": "07/2023 – present",
            "description": "AmaCart is an e-commerce website that offers a seamless and user-friendly shopping experience for customers. •This Enabling users to explore a wide range of products, add items to their cart, and conveniently place orders.•I implemented an intuitive login system for users and an admin interface for store owners to manage their inventoryeffortlessly.",
            "technologies-used": "React JS, Google Firebase, Redux, CSS, HTML."
        },
        {
            "id": 3,
            "name": "Social Network",
            "organisation": "",
            "city": "",
            "country": "",
            "duration": "04/2021 – 06/2021",
            "description": "Developed a social networking website which allows users to connect and socialise. Here, users can: •Edit and update user data.•Chat, post their thoughts and share images.•Networkandjoindifferentgroups. TechnologiesUsed:MongoDB,ExpressJs,ReactJs,NodeJs",
            "technologies-used": "Mongo DB, Express Js, React Js, Node Js"
        },
        {
            "id": 4,
            "name": "E-Commerce",
            "organisation": "",
            "city": "",
            "country": "",
            "duration": "02/2020 – 06/2020",
            "description": "Developed an e-commerce website for a sports shop. It allows easy inventory management for business owners and a hassle-free shopping experience for users. Its main features are:•It can easily be customised for different businesses.•Itincludesachatbottosolvecustomerqueries.TechnologiesUsed:HTML,CSS,Javascript,PHP,SQL,Dialogflow,AWS.",
            "technologies-used": "HTML, CSS, Javascript, PHP, SQL, Dialogflow, AWS."
        }
    ];

    return (
        <div ref={ref} name="projects">
            <Container>
                {projects.map(proj => (
                    <Cards item={proj} />
                ))}
            </Container>
        </div>
    );

});
export default Projects;
import React, { forwardRef } from 'react';
import Cards from '../Cards';
import Container from '../Container';

const WorkExperience = forwardRef((props, ref) => {
  const workExperience = [
    {
      "id": 1,
      "name": "Frontend Developer",
      "organisation": "Deloitte",
      "city": "Frankfurt",
      "country": "Germany",
      "duration": "01/2023 – 04/2023",
      "description": "Working as a frontend developer for aiStudio. My responsibilities are: • Development of user interfaces for different machine learning tools and applications using Angular and React. • Contributing to designing user interfaces to make them less complicated and easier to use. • Optimizing frontend code to make it perform better and faster."
    },
    {
      "id": 2,
      "name": "Software Analyst",
      "organisation": "Capgemini",
      "city": "Bangalore",
      "country": "India",
      "duration": "04/2021 – 09/2022",
      "description": "Worked as a front-end developer for Amgen, on a web portal to be used by HCPs worldwide. My responsibilities were: • Building fast and scalable websites using modern web technologies such as ReactJS, HTML, CSS, JavaScript, and Bootstrap with Sitecore CMS(ver. 10.1). • Writing application-level code to interact with APIs, and Web Services using AJAX, JSON, and XML • Designing, building, and maintaining efficient, reusable, reliable secure, scalable, high-performing, and testable code. • Optimizing components for maximum performance across various web-capable devices and browsers."
    },
    {
      "id": 3,
      "name": "Web Developer(Intern)",
      "organisation": "Softway",
      "city": "Bangalore",
      "country": "India",
      "duration": "07/2019 – 07/2019",
      "description": "Worked as a web developer intern on a project for online catering services. My tasks were: • Working as a back-end developer using PHP to maintain website integrity, security, and efficiency. • Developing a chatbot using Dialogflow."
    }
  ];

  return (
    <div ref={ref} name="work experience">
      <Container>
        {workExperience.map(work => (
          <Cards item={work} />
        ))}
      </Container>
    </div>
  );
});

export default WorkExperience;

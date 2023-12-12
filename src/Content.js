import React from 'react';
import Certifications from "./Content/Certifications";
import Education from "./Content/Education";
import Hobbies from "./Content/Hobbies";
import Languages from "./Content/Languages";
import Projects from "./Content/Projects";
import Skills from "./Content/Skills";
import WorkExperience from "./Content/WorkExperience";

const Content = ({refProp}) => {
    return (
        <div className='p-5' ref={refProp}>
            <WorkExperience />
            <Education />
            <Projects />
            <Certifications />
            <Skills />
            <Hobbies />
            <Languages />
        </div>
    )
};
export default Content;
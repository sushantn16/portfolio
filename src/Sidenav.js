import React from 'react';
import { Button } from '@mui/material';

const SideNav = ({ scrollToRef, activeSection }) => {
    const scrollToSection = (sectionRef) => {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <div className='p-5 sticky top-14'>
        <Button sx={{ color: activeSection === 'workExperience' ? 'primary.main' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.workExperienceRef)}>Work Experience</Button>
        <Button sx={{ color: activeSection === 'education' ? 'primary.main' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.educationRef)}>Education</Button>
        <Button sx={{ color: activeSection === 'projects' ? 'primary.main' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.projectsRef)}>Projects</Button>
        <Button sx={{ color: activeSection === 'skills' ? 'primary.main' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.skillsRef)}>Skills</Button>
        <Button sx={{ color: activeSection === 'certifications' ? 'primary.main' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.certificationsRef)}>Certifications</Button>
        <Button sx={{ color: activeSection === 'languages' ? 'primary.main' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.languagesRef)}>Languages</Button>
        <Button sx={{ color: activeSection === 'hobbies' ? '#000' : '#fff', fontWeight: 'bold', fontSize: '20px', display: 'block' }} onClick={() => scrollToSection(scrollToRef.hobbiesRef)}>Hobbies</Button>
      </div>
    );
  };
  
  export default SideNav;
  
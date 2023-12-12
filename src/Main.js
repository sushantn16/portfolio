import React, { useState, useRef, useEffect } from 'react';
import Header from "./Header";
import Intro from "./Intro";
import SideNav from "./Sidenav";
import Grid from '@mui/material/Grid';
import Certifications from "./Content/Certifications";
import Education from "./Content/Education";
import Hobbies from "./Content/Hobbies";
import Languages from "./Content/Languages";
import Projects from "./Content/Projects";
import Skills from "./Content/Skills";
import WorkExperience from "./Content/WorkExperience";

// ... (imports)

const Main = () => {
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const [activeSection, setActiveSection] = useState('workExperience'); // Initial active section
    const introRef = useRef();
    const workExperienceRef = useRef();
    const educationRef = useRef();
    const projectsRef = useRef();
    const certificationsRef = useRef();
    const skillsRef = useRef();
    const hobbiesRef = useRef();
    const languagesRef = useRef();
    const scrollToRef = {
        workExperienceRef,
        educationRef,
        projectsRef,
        certificationsRef,
        skillsRef,
        hobbiesRef,
        languagesRef,
    };

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Set the active section based on the ref
                setActiveSection(entry.target.id);
                setIsIntroVisible(false);
            }
        });
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        // Observe all section refs
        Object.entries(scrollToRef).forEach(([key, ref]) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.entries(scrollToRef).forEach(([key, ref]) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [scrollToRef]);

    return (
        <>
            {isIntroVisible && (
                <div ref={introRef}>
                    <Intro />
                </div>
            )}
            <Header />
            <Grid container spacing={1}>
                <Grid xs={3}>
                    <SideNav scrollToRef={scrollToRef} activeSection={activeSection} />
                </Grid>
                <Grid xs={9} className='p-5'>
                    <WorkExperience ref={workExperienceRef} id="workExperience" />
                    <Education ref={educationRef} id="education" />
                    <Projects ref={projectsRef} id="projects" />
                    <Skills ref={skillsRef} id="skills" />
                    <Certifications ref={certificationsRef} id="certifications" />
                    <Languages ref={languagesRef} id="languages" />
                    <Hobbies ref={hobbiesRef} id="hobbies" />
                </Grid>
            </Grid>
        </>
    );
};

export default Main;

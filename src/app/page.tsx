'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Mail, Linkedin, Download } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge";


export default function Home() {

  const socials = [
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/sushantnandwani/",
      label: "Twitter",
      handle: "@sushantnandwani",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:nandwanisushant@gmail.com",
      label: "Email",
      handle: "nandwanisushant@gmail.com",
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/sushantn16",
      label: "Github",
      handle: "sushantn16",
    },
  ];
  const skills = [
    "NextJS", "React", "Angular", "MaterialUI", "ShadCN", "HTML", "CSS", "TypeScript", "JavaScript", "NodeJS", "ShadCN", "Python", "C++", "Django", "Firebase", "Vercel", "Azure", "AWS", "SQL", "MongoDB", "Jira", "Git"
  ]

  const projects = [
    {
      name: "Reservations",
      description: "This is a full stack application under way, which allows users to make reservations to a restraunt, also allow them to order food online. Users can also manage their orders and reservations here.",
      href: "https://github.com/sushantn16/reservations"
    },
    {
      name: "Spectrum",
      description: "It is a dashboard application displaying mock sensor data from an aircraft. It also allows users to take actions whenever required. It is made using React and Typescript.",
      href: "https://aerospace-data-dashboard.netlify.app/"
    },
    {
      name: "lifeOfSushant",
      description: "It is a simple personal blog website where I can share something abou my life. It is built using nextJs and deployed on Vercel. ",
      href: "https://lifeofsushant.com/"
    },
    {
      name: "Amacart",
      description: "This is an e-commerce website which allows users to shop and manage their account. It uses firebase for backend and is built using React. ",
      href: "https://shopping-app-b9c1a.web.app/"
    },
    {
      name: "Weather",
      description: "This is a simple weather checking application which uses mapbox api to help you find your city and open weather api to fetch the weather details.",
      href: "https://weather-watcher11.netlify.app/"
    }
  ]

  return (
    <main className="min-h-screen p-24 font-mono bg-black text-white relative">
      <Link
        href={'public/Nandwani_Sushant.pdf'}
        target="_blank"
        download={'public/Nandwani_Sushant.pdf'}
        className="duration-700 group fixed bottom-10 right-10">
        <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
          <Download />
        </span>
      </Link>
      <div className='flex flex-col items-center'>
        <p className='text-5xl'>Sushant Nandwani</p>
        <p className='text-slate-300 text-center text-sm mt-2'>Software Engineer | Full-stack Developer</p>
        <p className='text-slate-300 text-center text-sm mt-2'>Koblenz, Germany</p>
        <div className="flex flex-row gap-8 justify-center mt-5">
          {socials.map((s, i) => (
            <div className="w-max" key={i}>
              <Link
                href={s.href}
                target="_blank"
                className="duration-700 group">
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-slate-300 text-center text-sm mt-5">Currently, I am working on improving my web development skills and getting my hands dirty on <Link href={"https://www.rust-lang.org/learn"} target="_blank" className="underline">rust</Link>.</p>
      </div>
      <div className="mt-10">
        <p className="text-2xl">Projects</p>
        <p className="text-slate-300 mt-3">Some of the projects are from work and some are on my own time.</p>
        <div className="w-full h-px bg-zinc-800 mt-5" />
        <div className="gap-5 flex flex-row flex-wrap mt-10 text-justify">
          <Carousel>
            <CarouselContent>
              {projects.map((project,i) =>
                <CarouselItem className="basis-1/3" key={i}>
                  <Link href={project.href} className="duration-700 group" target="_blank">
                    <Card className="bg-black h-80 border-zinc-500 group-hover:border-zinc-200 duration-1000 text-zinc-200 group-hover:text-white">
                      <CardHeader className="text-xl">
                        {project.name}
                      </CardHeader>
                      <CardContent className=" " >
                        {project.description}
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="bg-black border-0" />
            <CarouselNext className="bg-black border-0" />
          </Carousel>
        </div>
        <p className="text-slate-300 mt-5" >You can see more of my work on <Link className="underline" href={"https://github.com/sushantn16"} target="_blank">Github</Link>.</p>
      </div>

      <div className="mt-10">
        <p className="text-2xl">Skills</p>
        <p className="text-slate-300 mt-3">The tools and technologies I have worked with over time.</p>
        <div className="w-full h-px bg-zinc-800 mt-5" />
        <div className="gap-5 flex flex-row flex-wrap mt-10 text-justify">
          {skills.map((skill, i) => <Badge key={i} className="text-zinc-200 border-zinc-500 p-3 rounded-md hover:border-zinc-200 hover:text-white" variant={"outline"}>{skill}</Badge>)}

        </div>
      </div>

    </main>
  )
}

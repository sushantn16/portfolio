
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Github, Mail, Linkedin, Download, EyeIcon } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
    "NextJS", "React", "Angular","goLang", "MaterialUI", "ShadCN", "HTML", "CSS", "TypeScript", "JavaScript", "NodeJS", "ShadCN", "Python", "C++", "Django", "Firebase", "Vercel", "Azure", "AWS", "SQL", "MongoDB", "Jira", "Git"
  ]

  const projects = [
    {
      name: "Kanban",
      description: "This is a full stack application under way, which allows users to make manage tasks, collaborate and track the progress of the project. It is built using NextJs, Prisma, and Postgres.",
      href: "",
      github: "https://github.com/sushantn16/kanban"
    },
    {
      name: "Spectrum",
      description: "It is a dashboard application displaying mock sensor data from an aircraft. It also allows users to take actions whenever required. It is made using React and Typescript.",
      href: "https://aerospace-data-dashboard.netlify.app/",
      github: "https://github.com/sushantn16/spectrum"
    },
    {
      name: "lifeOfSushant",
      description: "It is a simple personal blog website where I can share something abou my life. It is built using nextJs and deployed on Vercel. ",
      href: "https://lifeofsushant.com/",
      github: "https://github.com/sushantn16/lifeofsushant"
    },
    {
      name: "Amacart",
      description: "This is an e-commerce website which allows users to shop and manage their account. It uses firebase for backend and is built using React. ",
      href: "https://shopping-app-b9c1a.web.app/",
      github: "https://github.com/sushantn16/AmaKart"
    },
    {
      name: "Weather",
      description: "This is a simple weather checking application which uses mapbox api to help you find your city and open weather api to fetch the weather details.",
      href: "https://weather-watcher11.netlify.app/",
      github: "https://github.com/sushantn16/weather"
    }
  ]

  return (
    <main className="min-h-screen p-8 md:p-24 font-mono bg-black text-white relative">
      <div className="fixed bottom-10 right-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href='/Nandwani_Sushant.pdf'
                target="_blank"
                download='Sushant Nandwani.pdf'
                className="duration-700 group">
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  <Download />
                </span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download CV</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex flex-col items-center text-center'>
        <div className="gradient-bg">
          <p className='text-4xl font-sans md:text-8xl gradient-text'>Sushant Nandwani</p>
        </div>

        <p className='text-slate-300 text-center text-sm mt-2'>Software Engineer | Full-stack Developer</p>
        <p className='text-slate-300 text-center text-sm mt-2'>Koblenz, Germany</p>
        <div className="flex flex-row gap-8 justify-center mt-5">
          {socials.map((s, i) => (
            <div className="w-max" key={i}>
              <Link
                href={s.href}
                target="_blank"
                className="duration-700 group">
                <span className="relative z-100 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-slate-300 text-center text-sm mt-5">Currently, I am focusing on improving my web development skills and getting my hands dirty on <Link href="https://go.dev/" target="_blank" className="underline">golang</Link>.</p>
      </div>
      <div className="mt-10">
        <p className="text-2xl">Projects</p>
        <p className="text-slate-300 mt-3">Some of the projects are i worked on in my own time.</p>
        <div className="w-full h-px bg-zinc-800 mt-5" />
        <div className="flex overflow-auto md:grid grid-cols-3 gap-5 mt-10">
          {projects.map((project, i) =>

            <Card className="group bg-black h-min-72 min-w-72 border-zinc-500 group-hover:border-zinc-200 duration-1000 text-zinc-200 group-hover:text-white flex flex-col justify-between" key={i}>
              <div>
                <CardHeader className="text-xl py-5">
                  {project.name}
                </CardHeader>
                <CardContent className=" " >
                  {project.description}
                </CardContent>
              </div>
              <CardFooter className="p-3 justify-end gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={project.github}>
                        <Github />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open github repo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {project.href !== "" &&
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={project.href} target="_blank" >
                          <EyeIcon />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Preview</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                }

              </CardFooter>
            </Card>)}
          <p className="text-slate-300 mt-5" >You can see more of my work on <Link className="underline" href={"https://github.com/sushantn16"} target="_blank">Github</Link>.</p>
        </div>

      </div>

      <div className="mt-10">
        <p className="text-2xl">Skills</p>
        <p className="text-slate-300 mt-3">The tools and technologies I have worked with over time.</p>
        <div className="w-full h-px bg-zinc-800 mt-5" />
        <div className="gap-3 md:gap-5 flex flex-row flex-wrap mt-10 text-justify">
          {skills.map((skill, i) => <Badge key={i} className="text-zinc-200 border-zinc-500 p-3 rounded-md hover:border-zinc-200 hover:text-white" variant={"outline"}>{skill}</Badge>)}

        </div>
      </div>

    </main>
  )
}

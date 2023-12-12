
const Intro = () => {

    return(
        <>
        <div className="flex h-screen">
            <div className="text-white md:w-6/12 flex items-center text-4xl p-5 text-left">
               <p> Hello, I'm Sushant Nandwani.<br/> A Frontend Developer.</p>
            </div>
            <div className="rounded-full w-6/12 p-5 hidden md:block">
                <img className="rounded-full" src="/about-me.jpg" alt="profile"/>
            </div>

        </div>
        </>
    )

}
export default Intro;
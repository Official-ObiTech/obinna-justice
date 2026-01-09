import About from "./components/about";
import Projects from "./components/projects";
import Skills from "./components/skills";
import ThreeBackground from "./components/ThreeBackground";

export default function Home() {
  return (
    <>
      <ThreeBackground />

      {/* Fullscreen hero */}
      <section className="relative min-h-screen flex items-center justify-center border border-4 border-black">
        <div className="">
<h1 className="text-white text-8xl md:text-12xl font-bold tracking-tight">
        <span>Hey I'm</span>  Obinna Justice
        </h1>
        <h4>I'm a Software deverloper</h4>
        </div>
        
      </section>

      {/* Content below */}
      <section className="min-h-screen">

        <Skills />

        <Projects />

  
<footer className="flex justify-between items-center p-8 bg-white text-black">
  <h5>Obinna Justice </h5>

  <div>
    <h6>Contact Me</h6>
    <p>Email: <span>obitechhq@gmail.com</span></p>
    <p>Phone: <span>++234 9138223067</span></p>
  </div>
</footer>
       
            
        {/* <p className="text-xl">Scroll content here</p> */}
      </section>
    </>
  );
}

import About from "./components/about";
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
      <section className="min-h-screen   border border-4 border-red-500">

        <Skills />

  
        <About />
          <About />
            <About />
              <About />
                <About />
            
        {/* <p className="text-xl">Scroll content here</p> */}
      </section>
    </>
  );
}

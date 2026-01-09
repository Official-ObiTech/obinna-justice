export default function Skills() {
  const skills = [
    { id: 1, name: "Html", image: "/html.svg" },
    { id: 2, name: "Css", image: "/css.svg" },
    { id: 3, name: "Javascript", image: "/javascript.svg" },
    { id: 4, name: "React Js", image: "/react.svg" },
    { id: 5, name: "Vue Js", image: "/vue.svg" },
    { id: 6, name: "Git", image: "/git.svg" },
    { id: 7, name: "Tailwindcss", image: "/tailwindcss.svg" },
  ];

  return (
    <section className="flex flex-col items-center  bg-gray-100">
      <div
        className="banner border border-4 border-pink-500 mx-auto px-12"
        style={{ "--total": skills.length } as React.CSSProperties}
      >
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="slider "
            style={{ "--i": index + 1 } as React.CSSProperties}
          >
            <div               className="item absolute w-44  h-48 bg-black rounded-xl p-2 flex flex-col items-center justify-center">
              <img  className="w-24 h-24 object-contain" src={skill.image} alt={skill.name} />
            <h6 className="mt-2 text-white text-xs font-semibold text-center px-1">
                {skill.name}
              </h6>
            </div>
          </div>
        ))}
      </div>

      {/* Description Text */}
      <p className="max-w-2xl text-center text-gray-600 text-lg mt-12 px-2">
        I work primarily with modern front-end technologies, building responsive
        and interactive user interfaces using HTML, CSS, and JavaScript. My
        experience with React and Vue allows me to create scalable,
        component-driven applications, while Tailwind CSS helps me design clean,
        consistent layouts efficiently. Git ensures maintainable codebases and
        smooth collaboration.
      </p>
    </section>
  );
}

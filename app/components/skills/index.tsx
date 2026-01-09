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
        className="banner border border-4 border-pink-500"
        style={{ "--total": skills.length } as React.CSSProperties}
      >
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="slider "
            style={{ "--i": index + 1 } as React.CSSProperties}
          >
            <div className="item h-52 w-44 bg-black rounded-xl ">
              <img src={skill.image} alt={skill.name} />
              <h6 className="mt-4 text-white">{skill.name}</h6>
            </div>
          </div>
        ))}
      </div>

      <p className="max-w-2xl text-center text-gray-600 text-lg">
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

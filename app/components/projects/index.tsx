

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "Master Builder",
      description: "A construction-based platform that handles government roads, houses, and bridges.",
      tools: ["Nuxt.js", "Tailwind CSS", "TypeScript", "NuxtUI"],
      img: "/master-builder.jpg", // ⚠️ Replace with real image; /css.svg is not appropriate
      contributors: ["Obinna", "Emake"],
      link: "https://app.skaldongroup.com", // trimmed extra spaces
      company: "Swizel TLD",
    },
    {
      id: 2, // ✅ Must be unique!
      name: "Punel",
      description: "A real-estate platform for purchasing and investing in land and property.",
      tools: ["Next.js", "Tailwind CSS", "TypeScript", "NuxtUI", "GraphQL"],
      img: "/punel.jpg", // ⚠️ Use real image
      contributors: ["Obinna", "Emake"],
      link: "https://punel.com", // ✅ Fixed typo (.coom → .com) and removed spaces
      company: "VeryDeepTech TLD",
    },
  ];

  return (
    <div className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-slate-100 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gray-300 border border-gray-400 rounded-lg w-16 h-16 flex items-center justify-center">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-10 h-10 object-contain"
                //   onError={(e) => {
                //     e.currentTarget.parentElement!.innerHTML = '🖼️'; // fallback icon
                //   }}
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{project.name}</h2>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Built with:</span> {project.tools.join(", ")}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Company:</span> {project.company}
              </p>
              <div>
                <span className="text-xs font-medium text-gray-500 mr-2">Team:</span>
                {project.contributors.map((name, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-1"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
export default [
  {
    _id: "M101",
    name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and rocket engines.",
    course: "RS101",
    lessons: [
      { _id: "L101", name: "History of Rocketry", description: "A brief history of rocketry and space exploration.", module: "M101" },
      { _id: "L102", name: "Rocket Propulsion Fundamentals", description: "Basic principles of rocket propulsion.", module: "M101" },
      { _id: "L103", name: "Rocket Engine Types", description: "Overview of different types of rocket engines.", module: "M101" }
    ]
  },
  {
    _id: "M102",
    name: "Fuel and Combustion",
    description: "Understanding rocket fuel, combustion processes, and efficiency.",
    course: "RS101",
    lessons: [
      { _id: "L201", name: "Rocket Fuel", description: "Overview of different types of rocket fuels.", module: "M102" },
      { _id: "L202", name: "Combustion Processes", description: "Understanding combustion processes and efficiency.", module: "M102" },
      { _id: "L203", name: "Combustion Instability", description: "Understanding combustion instability and mitigation.", module: "M102" }
    ]
  },
  {
    _id: "M103",
    name: "Nozzle Design",
    description: "Principles of rocket nozzle design and performance optimization.",
    course: "RS101",
    lessons: [
      { _id: "L301", name: "Nozzle Design", description: "Overview of different types of rocket nozzles.", module: "M103" },
      { _id: "L302", name: "Nozzle Performance", description: "Understanding nozzle performance and efficiency.", module: "M103" },
      { _id: "L303", name: "Nozzle Optimization", description: "Optimizing nozzle design for specific applications.", module: "M103" }
    ]
  },
  {
    _id: "M201",
    name: "Fundamentals of Aerodynamics",
    description: "Basic aerodynamic concepts and fluid dynamics principles.",
    course: "RS102",
    lessons: [
      { _id: "L401", name: "Aerodynamic Basics", description: "Introduction to aerodynamic principles.", module: "M201" },
      { _id: "L402", name: "Fluid Dynamics", description: "Understanding fluid dynamics in aerospace.", module: "M201" },
      { _id: "L403", name: "Aerodynamic Forces", description: "Study of aerodynamic forces acting on spacecraft.", module: "M201" }
    ]
  },
  {
    _id: "M202",
    name: "Subsonic and Supersonic Flow",
    description: "Understanding subsonic and supersonic aerodynamic behaviors.",
    course: "RS102",
    lessons: [
      { _id: "L501", name: "Subsonic Flow", description: "Basics of subsonic aerodynamics.", module: "M202" },
      { _id: "L502", name: "Supersonic Flow", description: "Principles of supersonic flight.", module: "M202" },
      { _id: "L503", name: "Shock Waves", description: "Understanding shock waves in supersonic flow.", module: "M202" }
    ]
  },
  {
    _id: "M203",
    name: "Aerodynamic Heating",
    description: "Study of aerodynamic heating and thermal protection systems.",
    course: "RS102",
    lessons: [
      { _id: "L601", name: "Heat Transfer", description: "Basics of heat transfer in aerospace.", module: "M203" },
      { _id: "L602", name: "Thermal Protection", description: "Materials used for thermal protection.", module: "M203" },
      { _id: "L603", name: "Aerothermal Analysis", description: "Analyzing thermal loads in flight.", module: "M203" }
    ]
  },
  {
    _id: "M301",
    name: "Spacecraft Structural Design",
    description: "Fundamentals of designing spacecraft structures and materials selection.",
    course: "RS103",
    lessons: [
      { _id: "L701", name: "Materials Science", description: "Study of materials used in spacecraft.", module: "M301" },
      { _id: "L702", name: "Structural Design", description: "Principles of spacecraft structural design.", module: "M301" },
      { _id: "L703", name: "Structural Analysis", description: "Analyzing spacecraft structures for stability.", module: "M301" }
    ]
  },
  {
    _id: "M302",
    name: "Orbital Mechanics",
    description: "Understanding orbital dynamics and mission planning.",
    course: "RS103",
    lessons: [
      { _id: "L801", name: "Orbital Elements", description: "Basics of orbital elements and parameters.", module: "M302" },
      { _id: "L802", name: "Orbital Transfers", description: "Techniques for transferring orbits.", module: "M302" },
      { _id: "L803", name: "Mission Design", description: "Planning and designing space missions.", module: "M302" }
    ]
  },
  {
    _id: "M303",
    name: "Spacecraft Systems Engineering",
    description: "Overview of spacecraft systems and subsystems engineering.",
    course: "RS103",
    lessons: [
      { _id: "L901", name: "Systems Engineering Basics", description: "Introduction to systems engineering.", module: "M303" },
      { _id: "L902", name: "Subsystem Design", description: "Designing spacecraft subsystems.", module: "M303" },
      { _id: "L903", name: "Integration and Testing", description: "Testing and integrating spacecraft systems.", module: "M303" }
    ]
  }
];

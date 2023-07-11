export const courses = [
  {
    name: "Astronomy 101",
    progress: 70,
    sections: [
      {
        name: "Section 1 - Introduction",
        active: false,
        description: "",
      },
      {
        name: "Section 2 - The Solar System",
        active: true,
        description: "Learn about the planets, their moons, the sun, asteroids, comets, and more.",
      },
      {
        name: "Section 3 - Beyond the Solar System",
        active: false,
        description: "",
      },
    ],
  },
  // more courses...
];

export const messages = [
  {
    sender: "Student",
    text: "What are the key concepts of Section 2?",
  },
  {
    sender: "Bot",
    text: "Section 2 focuses on the foundational concepts of...",
  },
  {
    sender: "Student",
    text: "Can you provide an example?",
  },
  {
    sender: "Bot",
    text: "Certainly! Here is an example...",
  },
  // more messages...
];

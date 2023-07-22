import { generateCourseSectionSession } from '@/server/helpers/ai/prompts/generate-course-section-session'

const courseDescription = 'Astronomy 101'

const courseBody = `Course Title: Astronomy 101 for Lifelong Learners

Course Duration: 13 Weeks

Week 1: Introduction to Astronomy
- Unit 1: Overview of Astronomy
- Unit 2: History of Astronomy
- Unit 3: Basic Astronomical Terms

Week 2: The Solar System
- Unit 1: Overview of the Solar System
- Unit 2: Planets and their Characteristics
- Unit 3: Other Celestial Bodies (Asteroids, Comets, Meteors)

Week 3: Stars and Galaxies
- Unit 1: Life Cycle of Stars
- Unit 2: Types of Galaxies
- Unit 3: The Milky Way

Week 4: The Universe
- Unit 1: The Big Bang Theory
- Unit 2: Dark Matter and Dark Energy
- Unit 3: The Multiverse Theory

Week 5: Telescopes and Observatories
- Unit 1: Types of Telescopes
- Unit 2: Famous Observatories
- Unit 3: Home Astronomy: Observing the Sky

Week 6: The Moon and its Phases
- Unit 1: Overview of the Moon
- Unit 2: Lunar Phases
- Unit 3: Lunar Eclipses

Week 7: The Sun and Solar Phenomena
- Unit 1: Overview of the Sun
- Unit 2: Solar Phenomena (Solar Flares, Sunspots)
- Unit 3: Solar Eclipses

Week 8: Earth's Atmosphere and Climate
- Unit 1: Earth's Atmosphere
- Unit 2: Climate and Weather
- Unit 3: Impact of Solar Activity on Climate

Week 9: Space Exploration
- Unit 1: History of Space Exploration
- Unit 2: Current Space Missions
- Unit 3: Future of Space Exploration

Week 10: Astrobiology
- Unit 1: The Search for Extraterrestrial Life
- Unit 2: Conditions for Life
- Unit 3: Famous Astrobiology Missions

Week 11: Cosmology
- Unit 1: The Study of the Universe
- Unit 2: Cosmological Models
- Unit 3: The Future of the Universe

Week 12: Astro-photography
- Unit 1: Basics of Astro-photography
- Unit 2: Equipment and Techniques
- Unit 3: Capturing Celestial Events

Week 13: Review and Reflection
- Unit 1: Review of Key Concepts
- Unit 2: Reflection on Learning
- Unit 3: Next Steps in Astronomy

Recommended Reading List:
1. "A Brief History of Time" by Stephen Hawking
2. "Cosmos" by Carl Sagan
3. "The Universe in a Nutshell" by Stephen Hawking
4. "Pale Blue Dot: A Vision of the Human Future in Space" by Carl Sagan
5. "Death by Black Hole: And Other Cosmic Quandaries" by Neil deGrasse Tyson
6. "The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory" by Brian Greene
7. "Astrophysics for People in a Hurry" by Neil deGrasse Tyson
8. "The Fabric of the Cosmos: Space, Time, and the Texture of Reality" by Brian Greene
9. "The Planets" by Dava Sobel
10. "The Backyard Astronomer's Guide" by Terence Dickinson and Alan Dyer.`

const sectionBody = `
Module 3: Stars and Galaxies

Week 3: Stars and Galaxies

Unit 1: Life Cycle of Stars
- Introduction to Stars: Definition, formation, and basic characteristics of stars.
- Stellar Evolution: Detailed study of the life cycle of stars, from their birth in nebulae to their death as white dwarfs, neutron stars, or black holes.
- Hertzsprung-Russell Diagram: Understanding the relationship between the brightness, temperature, and color of stars.

Unit 2: Types of Galaxies
- Introduction to Galaxies: Definition and basic characteristics of galaxies.
- Classification of Galaxies: Detailed study of the different types of galaxies - elliptical, spiral, and irregular galaxies.
- Local Group and Other Galaxy Clusters: Understanding our own galaxy cluster (the Local Group) and learning about other galaxy clusters in the universe.

Unit 3: The Milky Way
- Overview of the Milky Way: Understanding the structure, size, and composition of our home galaxy.
- The Galactic Center: Learning about the center of the Milky Way, including the supermassive black hole Sagittarius A*.
- The Milky Way in the Universe: Understanding the Milky Way's location in the universe and its relationship with other galaxies.

This module will provide a comprehensive understanding of stars and galaxies, which are fundamental to the study of astronomy. Through this module, students will gain a deeper appreciation for the vastness and complexity of the universe.`

async function main() {
  const section = await generateCourseSectionSession({
    courseDescription,
    courseBody,
    sectionBody,
    sectionCount: 3,
    sessionCount: 2,
  })

  // Should be the sun's influence on earth
  console.log(section)
}

main()

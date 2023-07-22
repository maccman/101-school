import { generateWikipediaLinks } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { fetchImageForWikpediaUrl } from '@/server/lib/wikipedia'

const body = `
Unit 2: Types of Galaxies

Introduction to Galaxies

Galaxies are vast, gravitationally bound systems that consist of stars, stellar remnants, interstellar gas, dust, and dark matter. They are the fundamental building blocks of the universe, with sizes ranging from a few thousand to hundreds of thousands of light-years across. The number of galaxies in the observable universe is estimated to be around 100 billion.

Classification of Galaxies

Galaxies are primarily classified into three types based on their visual morphology: elliptical, spiral, and irregular.

1. Elliptical Galaxies: These galaxies appear round or elliptical in shape, hence the name. They are characterized by a smooth, almost featureless brightness profile and are typically composed of older, low-mass stars. There is little to no star formation in these galaxies, and they contain minimal amounts of interstellar matter. Elliptical galaxies vary greatly in size and mass, with some dwarf elliptical galaxies being less than one-tenth the size of the Milky Way, while giant elliptical galaxies can be 20 times larger and contain over a trillion stars.

2. Spiral Galaxies: Spiral galaxies are characterized by a flat, rotating disk of stars and interstellar medium, with a central bulge of older stars. Extending outward from the bulge are relatively bright arms of younger, hot stars, which spiral around the galaxy. Our own galaxy, the Milky Way, is an example of a spiral galaxy. Spiral galaxies are sites of ongoing star formation and are rich in gas and dust.

3. Irregular Galaxies: As the name suggests, irregular galaxies do not fit into the elliptical or spiral categories. These galaxies lack a distinct regular shape or structure. They are often chaotic in appearance, with neither a nuclear bulge nor any trace of spiral arm structure. Irregular galaxies are usually rich in gas and dust, indicating ongoing star formation.

Local Group and Other Galaxy Clusters

Our Milky Way galaxy is part of a galaxy group known as the Local Group. The Local Group spans about 10 million light-years and contains more than 54 galaxies, including the Andromeda galaxy, which is the closest spiral galaxy to the Milky Way, and the Triangulum galaxy, the third-largest galaxy in the group.

Galaxy clusters are larger-scale structures that can contain hundreds or even thousands of galaxies. They are among the largest known structures in the universe, held together by gravitational attraction. Examples of nearby galaxy clusters include the Virgo Cluster, the Coma Cluster, and the Hercules Cluster.

In conclusion, understanding the types and structures of galaxies is crucial in the study of astronomy. It helps us comprehend the vastness of the universe and the incredible diversity of structures it contains. Each galaxy is a unique combination of stars, gas, dust, and dark matter, all interacting through the fundamental force of gravity to create a breathtaking array of cosmic vistas.
`

async function main() {
  const result = await generateWikipediaLinks(body)

  console.log(JSON.stringify(result, null, 2))

  const image = await fetchImage(result)

  console.log({ image })
}

async function fetchImage(urls: string[]) {
  for (const url of urls) {
    try {
      const image = await fetchImageForWikpediaUrl(url)

      if (image) {
        const test = await fetch(image.source)

        if (test.ok) {
          return image
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return null
}

main()

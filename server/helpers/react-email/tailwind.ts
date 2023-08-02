'use server'

import { TailwindConfig, tailwindToCSS } from 'tw-to-css'

export async function processTailwindClasses(html: string, config?: TailwindConfig) {
  // We have to import react-dom/server dynamically because otherwise nextjs has a little fit
  const { twi } = tailwindToCSS({
    config,
  })

  const tailwindHtml = twi(html, {
    merge: false,
    ignoreMediaQueries: false,
  })

  const css = cleanCss(tailwindHtml)

  return css
}

/**
 * Clean css selectors to replace all non-alphanumeric characters with underscores
 */
function cleanCss(css: string) {
  let newCss = css
    .replace(/\\/g, '')
    // find all css selectors and look ahead for opening and closing curly braces
    .replace(/[.\!\#\w\d\\:\-\[\]\/\.%\(\))]+(?=\s*?{[^{]*?\})\s*?{/g, (m) => {
      return m.replace(/(?<=.)[:#\!\-[\\\]\/\.%]+/g, '_')
    })
    .replace(/font-family(?<value>[^;\r\n]+)/g, (m, value) => {
      return `font-family${value.replace(/['"]+/g, '')}`
    })
  return newCss
}

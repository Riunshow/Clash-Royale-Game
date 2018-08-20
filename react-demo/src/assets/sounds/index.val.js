const path = require('path')
const fg = require('fast-glob')

// __dirname is required, if you don't put *.val.js in the root of project
const images = fg.sync([`${__dirname}/**/*.png`, `${__dirname}/**/*.mp3`], {
  cwd: __dirname,
})

const assets = images.map(image => {
  const name = path.basename(image)
  const moduleName = name.replace('.mp3', '')

  return {
    name,
    path: image,
    moduleName,
  }
})

module.exports = () => {
  const imports = assets.map(
    ({ moduleName, path }) => `import ${moduleName} from '${path}'`
  )
  const objects = assets.map(
    ({ name, moduleName }) => `{name: '${name}', url: ${moduleName}}`
  )

  const code = `
${imports.join('\n')}
const objects = [ ${objects.join(',')} ]

export default objects
`
  return { code }
}

const path = require('path')
const fg = require('fast-glob')

// __dirname is required, if you don't put *.val.js in the root of project
const files = fg.sync([`${__dirname}/*.json`], {
  cwd: __dirname,
})

const metas = files.map(file => {
  const dir = path.dirname(file)
  const basename = path.basename(file)
  const ext = path.extname(basename)
  const id = basename.replace(ext, '')
  return [id, dir]
})

module.exports = () => {
  const imports = metas.map(([id, dir]) =>
    [
      `import ${id}Skeleton from '${dir}/${id}.json'`,
      `import ${id}Atlas from '${dir}/${id}.atlas'`,
      `import ${id}Image from '${dir}/${id}.png'`,
    ].join('\n')
  )

  const objects = metas.map(
    ([id]) => `
const ${id} = {
  skeleton: ${id}Skeleton,
  atlas: ${id}Atlas,
  image: ${id}Image,
}`
  )

  const exports = `export default { ${metas.map(([id]) => id).join(', ')} }`

  const preloadImages = metas.map(
    ([id]) => `
{
  name: '${id}.png',
  url: ${id}Image,
}
`
  )

  const spineImages = `export const spineImages = [ ${preloadImages.join(
    ',\n'
  )}]`

  const code = `
${imports.join('\n')}
${objects.join('\n')}
${exports}
${spineImages}
`
  return { code }
}

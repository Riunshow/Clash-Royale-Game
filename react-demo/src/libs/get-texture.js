import * as PIXI from 'pixi.js'

function getTexture(name, loader = PIXI.loader) {
  const resource = loader.resources[name]
  return resource && resource.texture
}

export default getTexture

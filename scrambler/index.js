const sizeOf = require('image-size')
const fs = require('fs')
const _path = require('path')
const { v4: uuidv4 } = require('uuid');


const dir = "C:/Users/Paul/Documents/LightroomExports/prnl"
const targetDir = "C:/Users/Paul/Documents/prnl"
const bucket = "https://dxurxb3qmablc.cloudfront.net"
const thumbTarget = _path.join(targetDir, 'thumb')
const fullTarget = _path.join(targetDir, 'full')

//Clear targetdir
if(fs.existsSync(targetDir)) fs.rmSync(targetDir, {recursive: true})
fs.mkdirSync(targetDir, {recursive: true})
fs.mkdirSync(thumbTarget)
fs.mkdirSync(fullTarget)

const files = fs.readdirSync(_path.join(dir, 'Thumbnails'))
.filter(file => _path.extname(file).toLowerCase() === '.jpg')
.map(item => ({name: item, ...sizeOf(_path.join(dir, 'Thumbnails',item))}))
.map(image => {
  const id = uuidv4()
  const ext = _path.extname(image.name)
  
  console.log(image.name, id)
  fs.copyFileSync(_path.join(dir, 'Thumbnails', image.name), _path.join(thumbTarget, id+ext))
  fs.copyFileSync(_path.join(dir, image.name), _path.join(fullTarget, id+ext))
    
  return {
    ...omit('name', image),
    thumb: `${bucket}/thumb/${id}.${image.type}`,
    full: `${bucket}/full/${id}.${image.type}`,
    svg: `${bucket}/svg/${id}.svg`
  }
})

console.log(files)


function omit(key, obj) {
  const {[key]: omitted, ...rest} = obj
  return rest
}
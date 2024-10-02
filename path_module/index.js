const path = require('path')
const url = require('url')

const filePath = (path.resolve("/node project","path_module","index.js"))
console.log("the current directory to file = ", filePath)

//return base file name
console.log("file = ",path.basename(filePath))

//return file name
console.log("file name =",path.basename(__filename,".js"))

//return dirname
console.log("directory name of a path = ",path.dirname(filePath))

//return file extension
console.log("extension = ",path.extname(filePath))

console.log("join = ",path.join("/node project","path_module","index.js"))

//Parses a path string into an object.
console.log(path.parse(filePath))

//Formats an object into a path string.
console.log(path.format({
    root: 'D:\\',
    dir: 'D:\\node project\\path_module',
    base: 'index.js',
    ext: '.js',
    name: 'index'
}))

//relative path from one location to another.
console.log(path.relative("path_module.js","callBound.js"))
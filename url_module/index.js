const url = require('url')

const myurl = new URL('https://github.com/GhevariyaHarshit/Node.js')
const myurl1 = new URL('https://abc:xyz@example.com')

console.log(myurl.hash)

console.log(myurl.host) //it return host name github.com and return port number

console.log(myurl.hostname)//it only return host name github.com

console.log(myurl.href)//return url https://github.com/GhevariyaHarshit/Node.js

console.log(myurl.origin)//it return protocal and host name https://github.com

console.log(myurl1.password)//it return pass xyz

console.log(myurl.pathname)//it return  GhevariyaHarshit/Node.js

console.log(myurl1.port)

console.log(myurl1.username)
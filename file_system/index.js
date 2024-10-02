const fs = require("fs")

//write file create file in sync 
// fs.writeFileSync("text.txt","New file create")

//write file in async and expect to call back function
// fs.writeFile("text.txt","new file create in async",(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("create file")
//     }
// })

//read file in sync
// const result = fs.readFileSync("text.txt","utf-8")
// console.log(result)

//read file in async
// fs.readFile("text.txt","utf-8",(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

//append file in sync
// fs.appendFileSync("text.txt","append my text")
//appeend ile in async
// fs.appendFile("text.txt",new Date().toString(),(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

//delete file in sync
// fs.unlinkSync("text.txt")
// fs.unlink("text1.txt",()=>{})

//remove text in file truncate()
// fs.truncate("text.txt",57,()=>{})
// fs.truncateSync("text.txt",49)

//copy file
// fs.copyFileSync("text.txt","copy.txt")
// fs.copyFile("text.txt","copy1.txt",()=>{})

//open
// file_descriptor = fs.openSync("text.txt")
// console.log("the file descriptor",file_descriptor)

// fs.close(file_descriptor,(err)=>{
//     if(err){
//         console.log('file to close file',err)
//     }else{
//         console.log("\n file close successfully")
//     }
// })

// // access method to check file access
// fs.access("text.txt",fs.constants.W_OK,(err)=>{
//     if(err){
//         console.log('does not exist')
//     }else{
//         console.log("exits")
//     }
// })

//file name change
// fs.renameSync("log.txt","log1.txt")
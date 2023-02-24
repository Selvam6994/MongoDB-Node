const fs = require('fs');

// const quote ="Farmer is better than a doctor";


// fs.writeFile("./test.html",quote,(msg)=>{
//     console.log("completed writing");
// })

const quote2 = "Live more,worry less";
const [ , ,files]= process.argv
for(let i=1;i<=files;i++){
    fs.writeFile(`backUp/test${i}.html`,quote2,(msg)=>{
        console.log("files created");
    })
}

//task 2
//node file.js  30
// to create 30 files

fs.readFile("./test.html","utf-8",(err,data)=>{
    if(err){
        console.log("Error");
    }else{
        console.log(data);
    } 
})
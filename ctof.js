
const ctof=(n)=>
{const a = 9/5
const c = ((n*a)+32).toFixed(2)
return console.log(c);
}

ctof((process.argv[2]))

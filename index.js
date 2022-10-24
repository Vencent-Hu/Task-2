import fetch from 'node-fetch';
import { stdin, stdout } from 'process';
import readline from 'readline';

const compare = ( a, b ) => {
    if ( a.API < b.API ){
      return 1;
    }
    if ( a.API > b.API ){
      return -1;
    }
    return 0;
  }

fetch("https://api.publicapis.org/entries")
.then(response => response.json())
.then(json => {
    let arrayEntries = [];
    let sortedArray = [];
    json.entries.map((entry) => arrayEntries.push(entry));
    sortedArray = arrayEntries.sort((a, b) => compare(a,b));
    console.log(sortedArray);

    // const argu = process.argv.slice(2);

    // const print = argu.reduce((acc,value) => acc + value );

    // console.log(print);
    // const input = [];
    // const rl = readline.createInterface({
    //     input:stdin,
    //     output:stdout
    // });

    // rl.prompt();

    // rl.on('line',function(cmd){
    //     input.push(cmd);
    // })



    // rl.on('close', function(cmd){
    //     console.log(input.join('/n'));
    //     process.exit(0);
    // })

});




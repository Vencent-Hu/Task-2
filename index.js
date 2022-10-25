import fetch from "node-fetch";
import { stdin, stdout } from "process";
import readline from "readline";

//Comparison function to filter fetch values of ‘API’ decreasing alphabetically
const compare = (a, b) => {
  if (a.API < b.API) {
    return 1;
  }
  if (a.API > b.API) {
    return -1;
  }
  return 0;
};

//Fetching function
fetch("https://api.publicapis.org/entries")
  .then((response) => response.json())
  .then((json) => {
    let arrayEntries = []; //original array for fetching data
    let sortedArray = []; //sorted array with API decreasing order
    json.entries.map((entry) => arrayEntries.push(entry));
    sortedArray = arrayEntries.sort((a, b) => compare(a, b));

    const rl = readline.createInterface({
      input: stdin,
      output: stdout,
    });

    //This will be called infinitely if wrong input occured and there is no elements in array
    const recursiveAsyncReadline = () => {
        //Getting input from user cmd arguments then print
      rl.question("Please enter the category name : ", (cate) => {
        rl.question(
          "Please enter the number of results you want to see : ",
          (limit) => {
            const print = sortedArray
              .filter((result) => result.Category === cate)
              .slice(0, limit);

            if (print.length == 0) {
              console.log(
                "\nPlease enter the correct category( case sensitive) and integer number of limited results\n"
              );
              recursiveAsyncReadline();
            }
            else{
                console.log(print);
                rl.close();
            }
            
          }
        );
      });
    };

    recursiveAsyncReadline();
  });

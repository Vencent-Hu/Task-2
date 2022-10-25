import fetch from "node-fetch";
import { stdin, stdout } from "process";
import readline from "readline";

const compare = (a, b) => {
  if (a.API < b.API) {
    return 1;
  }
  if (a.API > b.API) {
    return -1;
  }
  return 0;
};

fetch("https://api.publicapis.org/entries")
  .then((response) => response.json())
  .then((json) => {
    let arrayEntries = [];
    let sortedArray = [];
    json.entries.map((entry) => arrayEntries.push(entry));
    sortedArray = arrayEntries.sort((a, b) => compare(a, b));

    const rl = readline.createInterface({
      input: stdin,
      output: stdout,
    });

    rl.question("Please enter the category name : ", (cate) => {
      rl.question(
        "Please enter the number of results you want to see : ",
        (limit) => {
          const print = sortedArray
            .filter((result) => result.Category === cate)
            .slice(0, limit);
          print.length == 0
            ? console.log(
                "No record, please enter the correct category name(case sensitive)"
              )
            : console.log(print);
          rl.close();
        }
      );
    });
  });

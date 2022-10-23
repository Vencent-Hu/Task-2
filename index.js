import fetch from 'node-fetch';

fetch("https://api.publicapis.org/entries")
.then(response => response.json())
.then(json => {console.log(json[0])});

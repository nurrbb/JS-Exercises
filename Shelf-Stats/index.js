const { booksData } = require("./books");
const shelfStats = require("./shelfStats");

const result = shelfStats(booksData);
console.log(result);

const { booksData } = require("./books");

const ShelfStats = (books) => {
    const categoryTotals ={};

    books.forEach((book) =>{
        const category = book.category;
        const sales = book.sales;

        if(categoryTotals[category]){
            categoryTotals[category] += sales;
        }
        else{
            categoryTotals[category] = sales;
        }
    });

    return categoryTotals;
};

module.exports = ShelfStats;
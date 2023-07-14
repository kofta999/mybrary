const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

authorSchema.pre("deleteOne", async function (next) {
    try {
        const query = this.getFilter();
        const hasBook = await Book.exists({ author: query._id });

        if (hasBook) {
            next(new Error("This author still has books."));
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Author', authorSchema)
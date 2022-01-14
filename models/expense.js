const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: false
    },
    title: {
        type: String,

        require: true
    },
    type: {
        type: String,

        require: true
    },
    date: {
        type: String,

        require: true
    },
    amount: {
        type: Number,

        require: true,

        trim: true
    }
},
    {
        timestamps: true
    }
);

const Expense = mongoose.model("expenses", expenseSchema);
module.exports = Expense;

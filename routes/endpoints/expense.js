const Expense = require("../../models/expense");

const routes = (app) => {

    app.post("/expense", async (req, res) => {
        let { title, date, type, amount } = req.body;

        if (!title || !date || !type || !amount) {
            return res.json({ status: "error", error: "please fill out the require fields" });
        }
        let oldExpense = await Expense.findOne({ title, date })
        if (oldExpense) {
            return res.status(400).json({ error: "Expenses With the same date and title already exist" })
        }
        try {
            let expense = new Expense(req.body);
            await expense.save();
            res.json(expense);
        }

        catch (err) {

            res.status(500).send(err);

        }
    });
    app.get("/expense", async (req, res) => {
        try {
            let expense = await Expense.find().populate("user_id");
            res.json(expense);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.get("/expense/:id", async (req, res) => {
        try {
            let expense = await Expense.findOne({ _id: req.params.id });
            res.json(expense);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.put("/expense/:id", async (req, res) => {
        try {
            let expense = await Expense.updateOne({ _id: req.params.id }, (req.body));
            res.json(expense);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.delete("/expense/:id", async (req, res) => {
        try {
            let expense = await Expense.deleteOne({ _id: req.params.id });
            res.json(expense);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
    app.delete("/expense", async (req, res) => {
        const { expenseArr } = req.body;
        try {
            let expense = await Expense.deleteMany({ _id: expenseArr });
            res.json(expense);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
module.exports = routes;
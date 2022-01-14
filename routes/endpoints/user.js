const User = require("../../models/user");

const routes = (app) => {

    // create a user
    app.post("/user", async (req, res) => {
        let { password, email, name } = req.body;
        console.log(password)
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be 8 character or more" });
        }
        if (password == ' ' || email == ' ' || name == ' ') {
            return res.status(400).json({ error: "Please fill in the fields" })
        }
        let oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(400).json({ error: "User with this email exist" })
        }

        try {
            let newUser = new User(req.body);
            await newUser.save();
            res.json({ data: newUser, massage: "ok" })
        }
        catch (err) {
            console.log(err.massage)
            res.status(400).send(err);
        }

    });

    //login a user
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        if (email == '' || password == ' ' || !password) {
            return res.status(400).json({ error: "Please fill in the fields" });
        }
        try {
            let logUser = await User.findOne({ email,password });
            if (logUser) {
                logUser.active = true;
                await logUser.save();
                return res.json({ status: 'ok', data: logUser });
            } else {
                return res.status(400).json({ error: "Invalid email or password" });

            }
        } catch (err) {
            res.status(500).send(err);
        }
    })
    // get users
    app.get("/user", async (req, res) => {
        try {
            console.log('all user');
            let user = await User.find();
            console.log(user);
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });

    app.put("/user/:id", async (req, res) => {
        try {
            let user = await User.updateOne({ _id: req.params.id }, req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete("/user/:id", async (req, res) => {
        try {
            let user = await User.findByIdAndDelete({ _id: req.params.id });
            res.json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
};
module.exports = routes;
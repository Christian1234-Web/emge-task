const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const port = process.env.PORT || 5001;
CONNECTION_STRING = "mongodb+srv://Emge1000:Emge1000@cluster0.0l9qq.mongodb.net/test";
// CONNECTION_STRING ="mongodb://localhost:27017/expense";


mongoose.connect(CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.on("open", () => console.log("mongoose is connected"));
mongoose.connection.on("error", (err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/build'));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	})
}
app.listen(port);
console.log("mongoose is running on port: " + port)

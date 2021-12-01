const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const cors=require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// const todoRouter = require("./routers/routes/todos");
// app.use( todoRouter);

// const registerRouter = require("./routers/routes/user");
// app.use(registerRouter);

// const loginRouter = require("./routers/routes/user");
// app.use( loginRouter);

// const roleRouter = require("./routers/routes/role");
// app.use( roleRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
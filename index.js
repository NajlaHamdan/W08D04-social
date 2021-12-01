const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const roleRouter = require("./router/routes/role");
app.use( roleRouter);

const registerRouter = require("./router/routes/user");
app.use(registerRouter);

// const loginRouter = require("./routers/routes/user");
// app.use( loginRouter);

const postRouter = require("./router/routes/post");
app.use( postRouter);

const commentRouter = require("./router/routes/comment");
app.use( commentRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

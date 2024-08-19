const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDb = require("./db/db");
const dotenv = require("dotenv");
const { register, login } = require("../Backend/Auth/userAuthentication");
const middleware = require("../Backend/middleware/middleware");
const {
  eventAdding,
  eventList,
  eventUpdate,
  eventDelete,
} = require("../Backend/Auth/eventStorage");
const { eventFind } = require("../Backend/Auth/getEvenById");
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/register", register);
app.post("/login", login);
app.post("/events-add", middleware, eventAdding);
app.get("/events-list", middleware, eventList);
app.delete("/event-delete", middleware, eventDelete);
app.put("/event-update", middleware, eventUpdate);
app.get("/event-find/:id", middleware, eventFind);
ConnectDb();
app.listen(PORT || 8080, () => console.log("Server Running on port 5000"));

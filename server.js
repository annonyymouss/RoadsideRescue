const express = require("express");
const cors = require("cors");
const ConnectionDB = require("./config");

const app = express();
ConnectionDB();
app.use(cors());

app.use(express.json());

app.use("/backend/api/user", require("./routes/userroutes"));
app.use("/backend/api/service", require("./routes/servicerequestroutes"));
app.use("/backend/api/services", require("./routes/serviceroutes"));
app.use("/backend/api/review", require("./routes/reviewroutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const { MongoUri } = require("./config");

mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongow");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting", error);
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));

import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

// Creating server
app.listen(process.env.PORT, () => {
  console.log(`App is running on PORT ${process.env.PORT}`);
  connectDB();
});

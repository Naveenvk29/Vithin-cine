import dotenv from "dotenv";
import connectedDB from "./Config/index.db.js";
import { app } from "./app.js";

dotenv.config();

// Connect to MongoDB

const PORT = process.env.PORT || 8000;
connectedDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));

import dotenv from "dotenv";
import configureApp from "./configureApp";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    console.log("MongoDB connected");

    const app = configureApp();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
  }
}

startServer();

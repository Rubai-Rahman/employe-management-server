import app from "./app";
import config from "./app/config";
import { connectDB } from "./shared/db";

async function main() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("❌ Error starting the application:", err);
    process.exit(1); // Exit the process with an error code
  }
}

main();

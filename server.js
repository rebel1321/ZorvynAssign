import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import { startCronJobs } from './utils/cron.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect DB first
    await connectDB();
    console.log("✅ Database connected");

    // ✅ Start cron jobs
    startCronJobs();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
import cron from "node-cron";
import axios from "axios";

export const startCronJobs = () => {
  console.log("⏰ Cron job started...");

  cron.schedule("*/10 * * * *", async () => {
    try {
      console.log("🔁 Pinging server...");

      const url = process.env.SERVER_URL || "http://localhost:3000";

      await axios.get(`${url}/`);

      console.log("✅ Server pinged successfully");
    } catch (error) {
      console.error("❌ Ping failed:", error.message);
    }
  });
};
import mongoose from "mongoose";

let connectionPromise;

mongoose.connection.on("connected", () => console.log("Database Connected"));
mongoose.connection.on("disconnected", () => {
  connectionPromise = undefined;
});

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI).catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  await connectionPromise;
};

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.

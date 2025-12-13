import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connection Successfully ✅");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection Error. Please make sure that MongoDB is running.",
        err,
      );
      process.exit();
    });
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

import express, { Request, Response } from "express";

// Create an instance of Express
const app = express();

// Define a route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

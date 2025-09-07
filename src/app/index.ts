import express from "express";
import endpointsRouter from "./endpoints";

const app = express();
const port = process.env.PORT || 3002;

app.use("/api", endpointsRouter);

app.listen(port, () => 
{
    console.log(`API is running at http://localhost:${port}`);
});
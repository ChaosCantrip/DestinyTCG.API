import express from "express";
import { APIResponse } from "../../../lib/models/responses";
const router = express.Router();

router.get("/", (req, res) => 
{
    const response = new APIResponse("success", "Pong!");
    res.status(200).send(response);
});

export default router;
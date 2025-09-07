import express from "express";

export default async function getCardHandler(req: express.Request, res: express.Response)
{
    const cardId = req.params.cardId;
    res.send(cardId);
}
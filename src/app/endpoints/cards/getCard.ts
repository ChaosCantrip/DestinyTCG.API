import express from "express";
import { APIResponse } from "../../../lib/models/responses";
import { InvalidRequestBodyError, CardNotFoundError } from "../../../lib/errors";
import { Card } from "../../../lib/models/domain";

interface getCardRequest {
    card_id: string;
}

interface getCardResponse {
    id: string;
    name: string;
    description: string;
    set: {
        id: string;
        name: string;
    };
    rarity: string;
}

function isRequestValid(body: getCardRequest): body is getCardRequest 
{
    return (
        typeof body === "object" &&
        body !== null &&
        typeof body.card_id === "string"
    );
}

export default async function getCardHandler(req: express.Request, res: express.Response)
{
    if (!isRequestValid(req.body)) 
    {
        throw new InvalidRequestBodyError({ "card_id": "string" });
    }

    const { card_id } = req.body;

    let card: Card;

    try 
    {
        card = Card.get(card_id);
    }
    catch (error) 
    {
        if (error instanceof CardNotFoundError) 
        {
            const response = new APIResponse("error", "Card not found", { card_id: card_id });
            res.status(404).send(response);
            return;
        }
        else 
        {
            throw error;
        }
    }

    const card_data: getCardResponse = {
        id: card.id,
        name: card.name,
        description: card.description,
        set: {
            id: card.set.id,
            name: card.set.name,
        },
        rarity: card.rarity.name,
    };

    const response = new APIResponse("success", "Card retrieved successfully", card_data);
    res.status(200).send(response);
}
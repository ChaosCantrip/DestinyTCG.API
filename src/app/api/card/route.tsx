import { CardNotFoundError } from "@/lib/models/errors";
import { IncompleteRequestError } from "@/lib/models/errors/IncompleteRequestError";
import { Card, Manifest } from "@models/domain";
import { APIResponse } from "@models/responses";
import { NextRequest, NextResponse } from "next/server";

interface SetData {
    id: string;
    name: string;
}

interface CardData {
    id: string;
    name: string;
    description: string;
    set: SetData;
    rarity: string;
}

export async function GET(request: NextRequest): Promise<NextResponse>
{
    const startTime = new Date();
    const response = new APIResponse<CardData>(startTime);

    try
    {

        const searchParams = request.nextUrl.searchParams;
        const cardId = searchParams.get("id")?.toUpperCase();

        if (!cardId)
        {
            throw new IncompleteRequestError(["id"]);
        }

        await Manifest.initialise();

        const card = Card.get(cardId);

        response.message = "Card retrieved successfully.";
        response.payload = {
            id: card.id,
            name: card.name,
            description: card.description,
            set: {
                id: card.set.id,
                name: card.set.name
            },
            rarity: card.rarity.name
        }

        return response.success(200);
    }
    catch (error)
    {
        if (error instanceof CardNotFoundError)
        {
            response.message = `Card with ID '${error.cardId}' not found.`;
            return response.error(404);
        }
        else if (error instanceof IncompleteRequestError)
        {
            response.message = `Request is missing the following part(s): [${error.missingParts.join(", ")}]`;
            return response.error(400);
        }
        else 
        {
            response.message = "An unexpected error occurred.";
            console.error("Unexpected error in /api/card:", error);
            return response.error(500);
        }
    }
}


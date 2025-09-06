import { NextResponse } from "next/server";
import { APIResponse } from "@/lib/models/responses";

export async function GET(): Promise<NextResponse>
{
    const startTime = new Date();
    const response = new APIResponse(startTime);
    
    response.message = "Pong!";
    return response.success(200);
}
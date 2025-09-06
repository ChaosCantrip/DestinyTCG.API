import { NextResponse } from "next/server";

export async function GET() {
    const startTime = Date.now();
    
    return NextResponse.json(
        {
            success: "success",
            message: "pong",
            data: null,
            meta: {
                timestamp: new Date().toISOString(),
                processingTime: `${Date.now() - startTime}ms`,
            }
        },
        {
            status: 200
        }
    );
}
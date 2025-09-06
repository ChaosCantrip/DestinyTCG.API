import { NextResponse } from "next/server";
import { IncompleteResponseError } from "@models/errors";

type success = "success" | "error";

interface Meta {
    timestamp: string;
    processingTime: number;
}

interface APIResponseData<T> {
    success: success;
    message: string;
    payload: T | null;
    meta: Meta;
}

export class APIResponse<T>
{
    private _success: boolean | null = null;
    message: string | null = null;
    payload: T | null = null;
    startTime: Date;

    constructor(startTime: Date)
    {
        this.startTime = startTime;
    }

    public toJSON(): APIResponseData<T>
    {
        const endTime = new Date();
        const processingTime = endTime.getTime() - this.startTime.getTime();

        if (this._success === null)
        {
            throw new IncompleteResponseError("success");
        }
        if (this.message === null)
        {
            throw new IncompleteResponseError("message");
        }

        return {
            success: this._success ? "success" : "error",
            message: this.message,
            payload: this.payload,
            meta: {
                timestamp: endTime.toISOString(),
                processingTime
            }
        };
    }

    public success(status: number): NextResponse
    {
        this._success = true;
        return NextResponse.json(this.toJSON(), { status });
    }

    public error(status: number): NextResponse
    {
        this._success = false;
        return NextResponse.json(this.toJSON(), { status });
    }
}
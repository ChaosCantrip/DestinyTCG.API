import { IncompleteResponseError } from "../../errors";

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

export class APIResponse<T = unknown>
{
    success: success;
    message: string;
    payload: T | null = null;
    startTime: Date | null = null;
    meta: Meta | null = null;

    constructor(success: success, message: string, payload?: T)
    {
        this.success = success;
        this.message = message;
        this.payload = payload ?? null;
    }

    public toJSON(): APIResponseData<T>
    {

        if (this.success === null)
        {
            throw new IncompleteResponseError("success");
        }
        if (this.message === null)
        {
            throw new IncompleteResponseError("message");
        }
        if (this.startTime === null)
        {
            throw new IncompleteResponseError("startTime");
        }

        const endTime = new Date();
        const processingTime = endTime.getTime() - this.startTime.getTime();

        this.meta = {
            timestamp: endTime.toISOString(),
            processingTime
        };

        return {
            success: this.success,
            message: this.message,
            payload: this.payload,
            meta: this.meta
        };
    }
}
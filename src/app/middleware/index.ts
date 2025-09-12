import LogRequest from "./LogRequest";
import LogResponse from "./LogResponse";
import ErrorHandler from "./ErrorHandler";
import ConvertAPIResponse from "./ConvertAPIResponse";
import SetStartTime from "./SetStartTime";
import HandleIncorrectEndpoints from "./HandleIncorrectEndpoints";

const Middleware = {
    LogRequest,
    LogResponse,
    ErrorHandler,
    ConvertAPIResponse,
    SetStartTime,
    HandleIncorrectEndpoints
};

export default Middleware;
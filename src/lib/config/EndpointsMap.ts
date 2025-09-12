export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface EndpointDefinition {
    path: string;
    allowed_methods: HTTPMethod[];
}

export const EndpointsMap: EndpointDefinition[] = [
    { path: "/ping", allowed_methods: ["GET"] },

    { path: "/cards/getCard", allowed_methods: ["GET"] },

    { path: "/auth/refresh", allowed_methods: ["POST"] },
]
export interface RequestHandler {
    canHandle(request: Request): boolean;
    handle(request: Request): string; // successful transaction hash
}

export interface Request {
    methodName: string;
    arguments: any[];
}

export class TradingClient {
    public handlers: RequestHandler[];

    constructor(handlers: RequestHandler[]) {
        this.handlers = handlers;
    }

    public handle(request: Request): string {
        for (const handler of this.handlers) {
            if (handler.canHandle(request)) {
                try {
                    return handler.handle(request);
                } catch (err) {
                    throw err;
                }
            }
        }
        throw new Error('Could not find any handlers');
    }
}

export interface Message{
    username: string, //Simple Interface
    content: string,
    timestamp: number
}

export interface AuthPayload{
    username: string //Not a proper authentication yet just the first version.
}

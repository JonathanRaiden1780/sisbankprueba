export interface AccountInterface {
    id: string,
    type: string,
    mountA: number;
    mountM: number,
    mountL: number,
    client: string,
    balance?: number,
    date: string,
    dateMov?: string,
    send?: string
}
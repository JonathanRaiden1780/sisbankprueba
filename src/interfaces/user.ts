export interface UserInterface {
    id: string,
    names: string,
    lastname: string;
    email: string,
    curp: string,
    accounts?: string[],
    address: string,
    ident: string
}
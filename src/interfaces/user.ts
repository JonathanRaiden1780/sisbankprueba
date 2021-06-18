export interface UserInterface {
    id: string,
    names: string,
    lastname: string;
    email: string,
    employee: string,
    curp?: string,
    accounts?: string[],
    address?: string,
    ident?: string
}
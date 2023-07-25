import { UserType } from "../enums";
import { Auth } from "./auth.model";

export interface User extends Auth {
    name: string;
    username: string;
    role?: UserType;
}

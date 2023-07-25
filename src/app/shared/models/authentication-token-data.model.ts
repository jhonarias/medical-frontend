import { User } from ".";

export interface AuthenticationTokenData {
    token: string;
    user: User;
}

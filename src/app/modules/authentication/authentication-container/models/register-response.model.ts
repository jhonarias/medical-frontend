import { ApiResponse } from "src/app/shared/api-models";
import { Auth } from "src/app/shared/models";

export interface RegisterResponse extends Auth, ApiResponse {
    _id: string;
    name: string;
    username: string;
    role: string;
}

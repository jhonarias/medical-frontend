import { ApiResponse } from "src/app/shared/api-models";
import { User } from "src/app/shared/models";

export interface LoginResponse extends ApiResponse {
    token: string;
    user: User;
}

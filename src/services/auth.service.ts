import api from "@/lib/axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export const login = async (payload: LoginPayload) => {
    return await api.post(`/auth/login`, payload);
}
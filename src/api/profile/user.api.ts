import { api } from "../../utils/axios";
import type { UpdateProfileResponse, User } from "./user.types";

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (
  userData: Partial<User>,
): Promise<UpdateProfileResponse> => {
  const res = await api.put<UpdateProfileResponse>("/users/me", userData);
  return res.data;
};

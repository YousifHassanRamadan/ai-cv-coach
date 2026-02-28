import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpdateProfileResponse, User } from "./user.types";
import { getMe, updateMe } from "./user.api";
import { toast } from "sonner";

export const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, Partial<User>>({
    mutationFn: updateMe,
    onSuccess: (data) => {
      // Option 1: Refetch the "me" query to get the updated profile
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success(data.message || "Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });
};

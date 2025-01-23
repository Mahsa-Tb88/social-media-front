import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useRegister() {
  return useMutation({
    mutationFn: (data) => axios.post("/auth/register", data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data) => axios.post("/auth/login", data),
  });
}

export function useLogOut() {
  return useMutation({
    mutationFn: () => axios.post("/auth/logout"),
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: (formData) => axios.post("/misc/uploads", formData),
  });
}

export function useChangeBackgorund() {
  return useMutation({
    mutationFn: (data) => axios.post("/profile/background", data),
  });
}
export function useProfileImgChange() {
  return useMutation({
    mutationFn: (data) => axios.post("/profile/profileImg", data),
  });
}
export function useCreateNewPost() {
  return useMutation({
    mutationFn: (data) => axios.post("/profile/post", data),
  });
}

export function useEditUser() {
  return useMutation({
    mutationFn: (data) => axios.put(`/profile/edit/${data.id}`, data),
  });
}

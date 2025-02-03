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

export function useEditOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/editOverview/${data.id}`, data),
  });
}
export function useDeleteOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/deleteOverview/${data.id}`, data),
  });
}

export function useEditContactBaseInfo() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/user/editContactBaseInfo/${data.id}`, data),
  });
}

export function useDeleteContactBaseInfo() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/user/deleteContactBaseInfo/${data.id}`, data),
  });
}
export function useAddWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/newWork/${data.id}`, data),
  });
}
export function useEditWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/editWork/${data.id}`, data),
  });
}

export function useDeleteWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/deleteWork/${data.id}`, data),
  });
}

export function useEditEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/editEducation/${data.id}`, data),
  });
}

export function useDeleteEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/user/deleteEducation/${data.id}`, data),
  });
}

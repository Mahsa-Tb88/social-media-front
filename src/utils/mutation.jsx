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
    mutationFn: (data) => axios.put(`/users/editOverview/${data.id}`, data),
  });
}
export function useDeleteOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/deleteOverview/${data.id}`, data),
  });
}

export function useEditContactBaseInfo() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/users/editContactBaseInfo/${data.id}`, data),
  });
}

export function useDeleteContactBaseInfo() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/users/deleteContactBaseInfo/${data.id}`, data),
  });
}
export function useAddWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/newWork/${data.id}`, data),
  });
}
export function useEditWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/editWork/${data.id}`, data),
  });
}

export function useDeleteWork() {
  return useMutation({
    mutationFn: (data) => axios.delete(`/user/deleteWork/${data.id}`),
  });
}

export function useAddEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/newEducation/${data.id}`, data),
  });
}
export function useEditEducation() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/users/editEducation/${data.userId}`, data),
  });
}

export function useDeleteEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/deleteEducation/${data.id}`, data),
  });
}

export function useUpdatedRelationship() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/editRelationship/${data.id}`, data),
  });
}
export function useDeleteRelationship() {
  return useMutation({
    mutationFn: (data) => axios.delete(`/users/deleteRelationship/${data.id}`),
  });
}
export function useUpdatedFamily() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/editFamily/${data.id}`, data),
  });
}
export function useAddFamily() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/addFamily/${data.id}`, data),
  });
}
export function useDeleteFamilyMember() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/users/deleteFamilyMember/${data.id}`, data),
  });
}

export function useAddPlace() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/addPlace/${data.id}`, data),
  });
}
export function useEditPlace() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/editPlace/${data.id}`, data),
  });
}
export function useDeletePlace() {
  return useMutation({
    mutationFn: (data) => axios.put(`/users/deletePlace/${data.id}`, data),
  });
}

export function useAddFriend() {
  return useMutation({
    mutationFn: (data) => axios.put(`/addFriend/${data.userId}`, data),
  });
}

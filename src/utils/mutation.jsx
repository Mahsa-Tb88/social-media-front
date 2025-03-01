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
//overview
export function useEditOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/overviews/edit/${data.id}`, data),
  });
}
export function useDeleteOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/overviews/delete/${data.id}`, data),
  });
}

//info
export function useEditContactBaseInfo() {
  return useMutation({
    mutationFn: (data) => axios.put(`/infos/edit/${data.id}`, data),
  });
}
export function useDeleteContactBaseInfo() {
  return useMutation({
    mutationFn: (data) => axios.put(`/infos/delete/${data.id}`, data),
  });
}

//work
export function useAddWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/works/new/${data.id}`, data),
  });
}
export function useEditWork() {
  return useMutation({
    mutationFn: (data) => axios.put(`/works/edit/${data.id}`, data),
  });
}
export function useDeleteWork() {
  return useMutation({
    mutationFn: (data) => axios.delete(`/works/delete/${data.id}`),
  });
}

//education
export function useAddEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/educations/new/${data.id}`, data),
  });
}
export function useEditEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/educations/edit/${data.userId}`, data),
  });
}
export function useDeleteEducation() {
  return useMutation({
    mutationFn: (data) => axios.put(`/educations/delete/${data.id}`, data),
  });
}

//relationship
export function useUpdatedRelationship() {
  return useMutation({
    mutationFn: (data) => axios.put(`/relationships/edit/${data.id}`, data),
  });
}
export function useDeleteRelationship() {
  return useMutation({
    mutationFn: (data) => axios.delete(`/relationships/delete/${data.id}`),
  });
}

//family
export function useUpdatedFamily() {
  return useMutation({
    mutationFn: (data) => axios.put(`/families/edit/${data.id}`, data),
  });
}
export function useAddFamily() {
  return useMutation({
    mutationFn: (data) => axios.put(`/families/new/${data.id}`, data),
  });
}
export function useDeleteFamilyMember() {
  return useMutation({
    mutationFn: (data) => axios.put(`/families/delete/${data.id}`, data),
  });
}

//place
export function useAddPlace() {
  return useMutation({
    mutationFn: (data) => axios.put(`/places/new/${data.id}`, data),
  });
}
export function useEditPlace() {
  return useMutation({
    mutationFn: (data) => axios.put(`/places/edit/${data.id}`, data),
  });
}
export function useDeletePlace() {
  return useMutation({
    mutationFn: (data) => axios.put(`/places/delete/${data.id}`, data),
  });
}

//friends
export function useAddFriend() {
  return useMutation({
    mutationFn: (data) => axios.put(`/friends/add/${data.userId}`, data),
  });
}

export function useConfirmFriend() {
  return useMutation({
    mutationFn: (data) => axios.put(`/friends/confirm/${data.userId}`, data),
  });
}

export function useRemoveRequestFriend() {
  return useMutation({
    mutationFn: (data) =>
      axios.put(`/friends/delete/request/${data.userId}`, data),
  });
}

export function useRemoveFriend() {
  return useMutation({
    mutationFn: (data) => axios.put(`/friends/delete/${data.userId}`, data),
  });
}

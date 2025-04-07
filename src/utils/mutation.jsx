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
export function useEditUser() {
  return useMutation({
    mutationFn: (data) => axios.put(`/profile/edit/${data.id}`, data),
  });
}

//post
export function useCreateNewPost() {
  return useMutation({
    mutationFn: (data) => axios.post("/posts/new", data),
  });
}
export function useEditPost() {
  return useMutation({
    mutationFn: (data) => axios.put("/posts/edit/" + data.id, data),
  });
}
export function useDeleteComment() {
  return useMutation({
    mutationFn: (data) => axios.put("/posts/comment/delete/" + data.id, data),
  });
}
export function useDeletePost() {
  return useMutation({
    mutationFn: (id) => axios.delete("/posts/" + id),
  });
}
export function useleaveComment() {
  return useMutation({
    mutationFn: (data) => axios.put("/posts/comment/" + data.id, data),
  });
}
//overview
export function useEditOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/overviews/edit/${data.id}`, data),
  });
}
export function useEditIntro() {
  return useMutation({
    mutationFn: (data) => axios.put(`/overviews/edit/intro/${data.id}`, data),
  });
}
export function useDeleteOverview() {
  return useMutation({
    mutationFn: (data) => axios.put(`/overviews/delete/${data.id}`, data),
  });
}
export function useFilterOverviewsViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/overviews/viewer/${data.id}`, data),
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
export function useFilterInfosViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/infos/viewer/${data.id}`, data),
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
export function useFilterWorkViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/works/viewer/${data.id}`, data),
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
export function useFilterEducationViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/educations/viewer/${data.id}`, data),
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
export function useFilterRelViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/relationships/viewer/${data.id}`, data),
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
export function useFilterFamilyViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/families/viewer/${data.id}`, data),
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
export function useFilterPlaceViewer() {
  return useMutation({
    mutationFn: (data) => axios.put(`/places/viewer/${data.id}`, data),
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

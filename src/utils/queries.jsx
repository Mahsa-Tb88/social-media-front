import axios from "axios";
import { useQuery } from "@tanstack/react-query";
axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 4000;

export function useInitialize() {
  return useQuery({
    queryKey: ["initialize"],
    queryFn: () => axios.get("/misc/initialize"),
  });
}

export function useGetPostsUser(id) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => axios.get("/posts/" + id),
  });
}

export function useGetAllUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/users/"),
  });
}

export function useGetUserById(id) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => axios.get("/users/" + id),
  });
}

export function useGetIntro(id) {
  return useQuery({
    queryKey: ["overview", id],
    queryFn: () => axios.get("/users/intro/" + id),
  });
}
export function useGetOverview(id) {
  return useQuery({
    queryKey: ["overview", id],
    queryFn: () => axios.get("/overviews/" + id),
  });
}
export function useGetFriends(id) {
  return useQuery({
    queryKey: ["friends", id],
    queryFn: () => axios.get("/users/friends/" + id),
  });
}

export function useGetGalley(id) {
  return useQuery({
    queryKey: ["gallery", id],
    queryFn: () => axios.get("/profile/gallery/" + id),
  });
}
export function useGetPost(id) {
  return useQuery({
    queryKey: ["singlePost", id],
    queryFn: () => axios.get("/posts/single/" + id),
  });
}
export function useGetContactBaseInfo(id) {
  return useQuery({
    queryKey: ["contactBaseInfo", id],
    queryFn: () => axios.get("/infos/" + id),
  });
}

export function useGetWork(id) {
  return useQuery({
    queryKey: ["work", id],
    queryFn: () => axios.get("/works/" + id),
  });
}

export function useGetEducation(id) {
  return useQuery({
    queryKey: ["education", id],
    queryFn: () => axios.get("/educations/" + id),
  });
}

export function useGetFamilyRelationship(id) {
  return useQuery({
    queryKey: ["familyRel", id],
    queryFn: () => axios.get("/relationships/" + id),
  });
}

export function useSearchPerson(user) {
  return useQuery({
    queryKey: ["findUser", user],
    queryFn: () => axios.get("/users/search/findUser/", { params: { user } }),
  });
}
export function usePlaceLived(id) {
  return useQuery({
    queryKey: ["placeLived", id],
    queryFn: () => axios.get("/places/" + id),
  });
}

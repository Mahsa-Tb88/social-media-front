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
    queryFn: () => axios.get("profile/posts/" + id),
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

export function useGetOverview(id) {
  return useQuery({
    queryKey: ["overview", id],
    queryFn: () => axios.get("/users/overview/" + id),
  });
}

export function useGetContactBaseInfo(id) {
  return useQuery({
    queryKey: ["contactBaseInfo", id],
    queryFn: () => axios.get("/users/contactBaseInfo/" + id),
  });
}

export function useGetWork(id) {
  return useQuery({
    queryKey: ["work", id],
    queryFn: () => axios.get("/users/work/" + id),
  });
}

export function useGetEducation(id) {
  return useQuery({
    queryKey: ["education", id],
    queryFn: () => axios.get("/users/education/" + id),
  });
}

export function useGetFamilyRelationship(id) {
  return useQuery({
    queryKey: ["familyRel", id],
    queryFn: () => axios.get("/users/familyRel/" + id),
  });
}

export function useSearchPerson(user) {
  return useQuery({
    queryKey: ["findUser", user],
    queryFn: () => axios.get("/users/search/findUser/", { params: { user } }),
  });
}

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
    queryFn: () => axios.get("/user/" + id),
  });
}

export function useGetOverview(id) {
  return useQuery({
    queryKey: ["overview", id],
    queryFn: () => axios.get("/user/overview/" + id),
  });
}

export function useGetContactBaseInfo(id) {
  return useQuery({
    queryKey: ["contactBaseInfo", id],
    queryFn: () => axios.get("/user/contactBaseInfo/" + id),
  });
}

export function useGetWork(id) {
  return useQuery({
    queryKey: ["work", id],
    queryFn: () => axios.get("/user/work/" + id),
  });
}

export function useGetEducation(id) {
  return useQuery({
    queryKey: ["education", id],
    queryFn: () => axios.get("/user/education/" + id),
  });
}

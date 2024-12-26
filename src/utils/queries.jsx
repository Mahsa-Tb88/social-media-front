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
    queryFn: () => axios.get("user/posts/" + id),
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

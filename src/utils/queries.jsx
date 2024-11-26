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

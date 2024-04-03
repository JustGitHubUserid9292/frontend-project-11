import axios from "axios";
import proxify from "./proxy";

export default function fetchData(url) {
   return axios.get(proxify(url))
}
import { ORGANIZATION, ORGANIZATIONAdd } from "./api";
import { METHOD, request } from "@/utils/request";

export async function getTree(params) {
  return request(ORGANIZATION, METHOD.GET, params);
}

export async function addTree(params) {
  return request(ORGANIZATIONAdd, METHOD.POST, params);
}
export default { getTree,addTree };

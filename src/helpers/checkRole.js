import { getAccessToken } from "axios-jwt";
import { ROLE_INFO, ROLE_ID } from "../constant";

const checkRole = () => {
  const token = getAccessToken() || "";
  if (!token) {
    return { isAdmin: false, isManager: false, isClient: false };
  }
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  const { roleId = "" } = JSON.parse(payload.toString());
  const roleName = ROLE_INFO[roleId].name;

  return {
    isAdmin: roleName === ROLE_INFO[ROLE_ID.SUPER_ADMIN].name,
    isManager: roleName === ROLE_INFO[ROLE_ID.MANAGER].name,
    isClient: roleName === ROLE_INFO[ROLE_ID.CLIENT].name,
  };
};

export default checkRole;

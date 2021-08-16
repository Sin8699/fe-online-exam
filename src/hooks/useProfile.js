import { useState, useEffect } from "react";
import { GET_INFO_PROFILE_CLIENT, GET_INFO_PROFILE_MANAGER } from "../api/auth";
import checkRole from "../helpers/checkRole";
import useAxios from "../hooks/useAxios";

const useProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const { isClient } = checkRole();

  const { response: profile, fetchData: getProfileClient } = useAxios(
    GET_INFO_PROFILE_CLIENT(),
    false
  );
  const { response: profileManager, fetchData: getProfileManager } = useAxios(
    GET_INFO_PROFILE_MANAGER(),
    false
  );
  useEffect(() => {
    (async function () {
      if (isClient) {
        getProfileClient();
      } else {
        getProfileManager();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isClient) {
      setUserInfo(profile?.data || {});
    } else {
      setUserInfo(profileManager?.data || {});
    }
  }, [isClient, profile, profileManager]);

  return [userInfo, setUserInfo];
};

export default useProfile;

import { useUser } from "..";
import { useAppDispatch } from "../../../store/hooks";
import { FarmingData } from "../store/types";
import { updateFarmingData } from "../store/userSlice";

export const useUserContext = () => {
  const user = useUser();
  const dispatch = useAppDispatch();

  const setFarmingData = (payload: Partial<FarmingData>) => {
    dispatch(updateFarmingData(payload));
  };

  return {
    user,
    setFarmingData,
  };
};

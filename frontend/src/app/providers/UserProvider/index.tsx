import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setInitDataRaw, updateFarmingData } from "./store/userSlice";
import { selectInitDataRaw } from "./store/selectors";
import { useLazyGetOrCreateQuery, useLazyGetMeQuery } from "./store";
import { GetMeDto } from "./store/types";
import { setFarmingState } from "../../../pages/ui/AirdropPage/store/slices";

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<GetMeDto | undefined>(undefined);

export const useUser = () => useContext(UserContext);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<GetMeDto | undefined>();
  const launchParams = useLaunchParams();
  const dispatch = useAppDispatch();
  const initDataRaw = useAppSelector(selectInitDataRaw);
  const [getOrCreate, { isLoading, isFetching }] = useLazyGetOrCreateQuery();
  const [getMe] = useLazyGetMeQuery();
  const inviteInitData = useInitData();
  const referralUid = inviteInitData?.startParam || undefined;

  useEffect(() => {
    if (launchParams && launchParams.initDataRaw) {
      dispatch(setInitDataRaw(launchParams.initDataRaw));
    }
  }, [launchParams]);

  const getUserData = async () => {
    try {
      const isPremium = !!launchParams?.initData?.user?.isPremium;

      await getOrCreate({ isPremium, inviteCode: referralUid }).unwrap();

      if (launchParams?.initData?.user?.id) {
        localStorage.setItem(
          "telegram_user_id",
          launchParams.initData.user.id.toString(),
        );
      }

      const meData = await getMe().unwrap();
      setUserData(meData);

      dispatch(
        updateFarmingData({
          timePassed: meData.time_passed || 0,
          needToClaim: meData.need_to_claim,
          currentFarmReward: meData.current_farm_reward || 0,
          plusEverySecond: meData.plus_every_second || 0,
          taskRewardAmount: meData.taskRewardAmount,
          totalDuration: meData.total_duration,
          totalFarmReward: meData.total_farm_reward || 0,
        }),
      );
      dispatch(
        setFarmingState({
          currentTotalCoinsFarmed: meData.current_farm_reward || 0,
          remainingTime: meData.total_duration - Number(meData.time_passed),
        }),
      );
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  useEffect(() => {
    if (initDataRaw && !isLoading && !isFetching) {
      getUserData();
    }
  }, [initDataRaw]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

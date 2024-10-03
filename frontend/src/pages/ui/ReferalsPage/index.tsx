import React from "react";
import "./index.css";
import Block from "../../../widgets/ui/Block";
import Button from "../../../widgets/ui/Button";
import { useFetchReferralsQuery } from "./store";
import { RefIcon } from "../../../shared/assets";
import { useUser } from "../../../app/providers/UserProvider";

const InviteFriends: React.FC = () => {
  const userData = useUser();
  const inviteCode = userData?.account?.inviteCode;

  const {
    data: referrals = [],
    isLoading,
    error,
  } = useFetchReferralsQuery(
    { initData: userData?.id?.toString() || "" },
    { skip: !userData },
  );

  const openTelegramChat = () => {
    if (!inviteCode) return;
    const telegramUrl = `https://t.me/share/url?url=https://t.me/tap_your_coin_bot/TYC?startapp=${encodeURIComponent(inviteCode)}`;
    console.log(telegramUrl);

    window.open(telegramUrl, "_blank");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load referrals.</p>;
  }

  const avatarColors = ["#C3E8D2", "#F7E8D0", "#E3D1F9", "#FFDFC4", "#FFD1DC"];
  const getRandomColor = (index: number) =>
    avatarColors[index % avatarColors.length];

  return (
    <Block className="invite-friends-container">
      <Block className="header leaderboard-header">
        <h2>Invite Friends</h2>
        <p>Earn more BBP as a reward!</p>
        <img src={RefIcon} alt="Invite Icon" className="invite-icon" />
      </Block>

      <Block className="friends-count">
        <h3>{referrals.length} Friends</h3>
      </Block>

      <Block className="friends-list">
        {referrals.map((referral, index) => (
          <Block className="friend-item" key={referral.id}>
            <div
              className="avatar"
              style={{ backgroundColor: getRandomColor(index) }}
            >
              {referral.user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="friend-info">
              <h4>{referral.user.username}</h4>
              <span>{referral.earned_coins.toLocaleString()} BBP</span>
            </div>
          </Block>
        ))}
      </Block>

      <Button className="invite-button" onClick={openTelegramChat}>
        Invite friends
      </Button>
    </Block>
  );
};

export default InviteFriends;

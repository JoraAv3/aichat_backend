// TopRankItem.tsx
import React, { CSSProperties } from "react";
import "./index.css";
import { useUser } from "../../../../app/providers/UserProvider";

interface TopRankItemProps {
  id: number;
  username: string;
  score: string;
  rank: number;
  icon: string | null;
  rankDisplay?: string;
  backgroundColor: string;
  style?: CSSProperties;
}

const TopRankItem: React.FC<TopRankItemProps> = ({
  username,
  score,
  icon,
  rankDisplay,
  backgroundColor,
  style,
}) => {
  return (
    <div className="top-rank-item" style={style}>
      <div className="top-rank-item-block">
        <div className="avatar" style={{ backgroundColor }}>
          {username.slice(0, 2).toUpperCase()}
        </div>
        <div className="info">
          <h3>{username}</h3>
          <span>{score} BBP</span>
        </div>
      </div>
      <div className="rank-icon">
        {icon ? <img src={icon} alt={`Rank`} /> : rankDisplay}
      </div>
    </div>
  );
};

export default TopRankItem;

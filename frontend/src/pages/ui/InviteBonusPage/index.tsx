// InviteBonusPage.tsx
import React from 'react';
import './index.css'; 


interface InviteBonusItem {
  level: string;
  description: string;
  reward: number;
}

const FarmingSpeed: React.FC = () => {
  return (
    <div className="farming-speed">
      <h2>Farming Speed</h2>
      <div className="farm-rates">
        <div className="farm-rate">
          <h3>0.01 BBP</h3>
          <p>Current Farm Rate</p>
        </div>
        <div className="arrow">➔</div>
        <div className="farm-rate">
          <h3>0.02 BBP</h3>
          <p>Next Farm Rate</p>
        </div>
      </div>
    </div>
  );
};

const InviteBonusPage: React.FC = () => {
  const inviteBonuses: InviteBonusItem[] = [
    { level: 'I', description: 'Invite 2 friends', reward: 1500 },
    { level: 'II', description: 'Invite 3 friends', reward: 2000 },
    { level: 'III', description: 'Invite 5 friends', reward: 3000 },
    { level: 'IV', description: 'Invite 7 friends', reward: 3500 },
    { level: 'V', description: 'Invite 10 friends', reward: 5000 },
    { level: 'VI', description: 'Invite 15 friends', reward: 7000 },
    { level: 'VII', description: 'Invite 20 friends', reward: 10000 },
  ];

  return (
    <div className="page-content">
      <FarmingSpeed />
      <div className="invite-bonus-section">
        <h3>Invite Bonus</h3>
        <div className="invite-bonus-list">
          {inviteBonuses.map((item) => (
            <div key={item.level} className="invite-bonus-item">
              <div className="level-circle">{item.level}</div>
              <div className="invite-details">
                <p>{item.description}</p>
                <span>{item.reward} BBP</span>
              </div>
              <div className="task-btn">Check</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviteBonusPage;

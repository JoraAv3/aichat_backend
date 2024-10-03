import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Block from "../Block";
import "./index.css";
import { useUser } from "../../../app/providers/UserProvider";
import {
  useTonWallet,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import Modal from "../Modal";
import { useSaveWalletAddressMutation } from "../../../app/providers/UserProvider/store";
import Button from "../Button";
import {
  CoinIcon,
  RocketIcon,
  EmptyWalletIcon,
  CupStarIcon,
  SettingIcon,
} from "../../../shared/assets/index";

const Header: React.FC = () => {
  const user = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [saveWalletAddress] = useSaveWalletAddressMutation();

  const { open } = useTonConnectModal();
  const handleWalletClick = () => {
    setModalVisible(true);
  };

  const disconnectWallet = () => {
    if (tonConnectUI) {
      tonConnectUI.disconnect();
    }
  };

  useEffect(() => {
    if (wallet && userFriendlyAddress) {
      const appName = wallet.device.appName || "Unknown App";
      saveWalletAddress({ name: appName, address: userFriendlyAddress })
        .then(() => console.log("Адрес кошелька успешно сохранен"))
        .catch((error) =>
          console.error("Ошибка при сохранении адреса кошелька:", error),
        );
    }
  }, [wallet, userFriendlyAddress, saveWalletAddress]);

  return (
    <Block className="header">
      <div className="user-info">
        <Link className="invite-bonus-link" to='invite-bonus-page'>
          <Block className="username">
            <img src={CoinIcon} alt="User Avatar" className="user-avatar" />
            <Block className="user-tokens">
              <span className="username">
                {user?.username || user?.first_name}
              </span>
              <Block className="token-info">
                <img src={RocketIcon} className="rocket-img" alt="Rocket" />
                <span className="collected-tokens-amount">0.01</span>
                <span className="tocken-name">BBP</span>
              </Block>
            </Block>
          </Block>
        </Link>
      </div>

      <Block className="header-right-icons">
        <Block onClick={handleWalletClick} className="wallet-icon">
          <div>
            <img src={EmptyWalletIcon} alt="Wallet" />
          </div>
        </Block>

        <Block>
          <Link to="/leaders">
            <div>
              <img src={CupStarIcon} alt="Achievements" />
            </div>
          </Link>
        </Block>
        <Block>
          <Link to="/settings">
            <div>
              <img src={SettingIcon} alt="Settings" />
            </div>
          </Link>
        </Block>
      </Block>

      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        {wallet ? (
          <Button onClick={disconnectWallet}>Disconnect Wallet</Button>
        ) : (
          <Button onClick={open}>Connect Wallet</Button>
        )}
      </Modal>
    </Block>
  );
};

export default Header;

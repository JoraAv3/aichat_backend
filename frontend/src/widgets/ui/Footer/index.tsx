import "./index.css";
import Block from "../Block";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GiftIcon, HomeIcon, TradeIcon, UserIcon, WalletIcon } from "../../../shared/assets";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <footer className="footer">
      <Block>
        <NavLink
          to="/"
          className={`footer-item ${location.pathname === "/" ? "active" : ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={HomeIcon}
            alt={t("Home")}
            className="footer-icon"
          />
          <p>{t("Home")}</p>
        </NavLink>
      </Block>

      <Block>
        <div
          className={`footer-item ${location.pathname === "/trade" ? "active" : ""}`}
        >
          <img
            src={TradeIcon}
            alt={t("Trade")}
            className="footer-icon"
          />
          <p>{t("Trade")}</p>
        </div>
      </Block>

      <Block>
        <div
          className={`footer-item ${location.pathname === "/wallet" ? "active" : ""}`}
        >
          <img
            src={WalletIcon}
            alt={t("Wallet")}
            className="footer-icon"
          />
          <p>{t("Wallet")}</p>
        </div>
      </Block>

      <Block>
        <NavLink
          to="/portfolio"
          className={`footer-item ${location.pathname === "/portfolio" ? "active" : ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={UserIcon}
            alt={t("Portfolio")}
            className="footer-icon"
          />
          <p>{t("Portfolio")}</p>
        </NavLink>
      </Block>

      <Block>
        <NavLink
          to="/"
          className={`footer-item ${location.pathname === "/airdrop" ? "active" : ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={GiftIcon}
            alt={t("Airdrop")}
            className="footer-icon"
          />
          <p>{t("Airdrop")}</p>
        </NavLink>
      </Block>
    </footer>
  );
};

export default Footer;

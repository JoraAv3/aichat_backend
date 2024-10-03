import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Layout from "./ui/Layout";
import { SDKProvider } from "@telegram-apps/sdk-react";
import Airdrop from "../pages/ui/AirdropPage";
import UserProvider from "./providers/UserProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SettingsPage from "../pages/ui/SettingsPage";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "../shared/i18n/i18n";
import WallOfFame from "../pages/ui/LeaderboardPage";
import { useEffect, useState } from "react";
import Loader from "../shared/Loader";
import InviteFriends from "../pages/ui/ReferalsPage";
import Page from "./ui/Page";
import InviteBonusPage from "../pages/ui/InviteBonusPage";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setShowLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <SDKProvider acceptCustomStyles debug>
        <UserProvider>
          <TonConnectUIProvider
            actionsConfiguration={{
              twaReturnUrl: "https://t.me/tap_your_coin_bot/TYC",
            }}
            manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
          >
            {showLoader ? (
              <Loader />
            ) : (
              <Page>
                <Router>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Airdrop />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/leaders" element={<WallOfFame />} />
                      <Route path="/ref" element={<InviteFriends />} />
                      <Route path="/invite-bonus-page" element={<InviteBonusPage />} />
                    </Route>
                  </Routes>
                </Router>
              </Page>
            )}
          </TonConnectUIProvider>
        </UserProvider>
      </SDKProvider>
    </Provider>
  );
}

export default App;

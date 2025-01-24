// src/context.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { handleConnectGem, signTransactionGem } from "./wallets/gemwallet";
import { handleConnectCrossmark, signTransactionCrossmark } from "./wallets/crossmark";
import { getQrCode, signTransactionXaman } from "./wallets/xaman";
import PropTypes from "prop-types";

const defaultContext = {
  qrCode: "",
  jumpLink: "",
  xrpAddress: "",
  apiEndpoint: "",
  isMobile: false,
  isLoading: false,
  error: null,
  connectWallet: async () => {},
  disconnect: () => {},
  signTransaction: async () => {
    throw new Error("Context not initialized");
  },
};

export const WalletContext = createContext(defaultContext);

export const WalletProvider = ({ children, apiEndpoint }) => {
  const [qrCode, setQrCode] = useState("");
  const [jumpLink, setJumpLink] = useState("");
  const [xrpAddress, setXrpAddress] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      return typeof window !== "undefined" && window.innerWidth < 768;
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAddress = localStorage.getItem("xrpl-address");
      if (savedAddress) {
        setXrpAddress(savedAddress);
      }
    }
  }, []);

  const connectWallet = useCallback(
    async (walletType) => {
      setIsLoading(true);
      setError(null);

      try {
        switch (walletType) {
          case "gemwallet":
            await handleConnectGem(apiEndpoint, setXrpAddress);
            break;
          case "crossmark":
            await handleConnectCrossmark(apiEndpoint, setXrpAddress);
            break;
          case "xaman":
            await getQrCode(apiEndpoint, setQrCode, setJumpLink, isMobile, setXrpAddress);
            break;
          default:
            throw new Error("Invalid wallet type");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to connect wallet");
      } finally {
        setIsLoading(false);
      }
    },
    [isMobile, apiEndpoint]
  );

  const disconnect = useCallback(() => {
    setXrpAddress("");
    setQrCode("");
    setJumpLink("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("xrpl-address");
      localStorage.removeItem("xrpl-wallet");
    }
  }, []);

  const signTransaction = useCallback(
    async (transaction) => {
      if (typeof window === "undefined") {
        throw new Error("Window is not defined");
      }

      const walletType = localStorage.getItem("xrpl-wallet");

      switch (walletType) {
        case "gemwallet":
          return signTransactionGem(transaction);
        case "crossmark":
          return signTransactionCrossmark(transaction);
        case "xaman":
          return signTransactionXaman(transaction, apiEndpoint, isMobile, setQrCode, setJumpLink);
        default:
          throw new Error("No wallet connected");
      }
    },
    [isMobile, apiEndpoint]
  );

  const value = {
    qrCode,
    jumpLink,
    xrpAddress,
    isMobile,
    isLoading,
    error,
    apiEndpoint,
    connectWallet,
    disconnect,
    signTransaction,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
};

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useWallet } from "./context";

// MUI components
import Modal from "@mui/material/Modal";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Icon from "@mui/material/Icon";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export function WalletConnector({ onSuccess, onError }) {
  const { connectWallet, xrpAddress, isLoading, error } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (error) {
      setNotification({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [error]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleConnect = async (walletType) => {
    try {
      await connectWallet(walletType);
      onSuccess?.(xrpAddress);
      handleCloseModal();
      setNotification({
        open: true,
        message: "Successfully connected wallet",
        severity: "success",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect wallet";
      onError?.(errorMessage);
      setNotification({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleRedirectToAccountPage = () => {
    handleCloseModal();
    navigate("/account");
  };

  const walletOptions = [
    { id: "gemwallet", name: "GemWallet", icon: "wallet" },
    { id: "crossmark", name: "Crossmark", icon: "account_balance_wallet" },
    { id: "xaman", name: "Xaman", icon: "account_balance" },
  ];

  return (
    <MKBox>
      {!xrpAddress ? (
        <MKButton
          variant="gradient"
          color="dark"
          circular
          onClick={handleOpenModal}
          disabled={isLoading}
          sx={{
            minWidth: "140px",
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-1px)" },
          }}
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </MKButton>
      ) : (
        <MKButton
          variant={xrpAddress ? "outlined" : "contained"}
          color="dark"
          circular
          onClick={handleRedirectToAccountPage}
          startIcon={<Icon>person</Icon>}
          sx={{
            minWidth: "140px",
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-1px)" },
          }}
        >
          {`${xrpAddress.slice(0, 6)}...${xrpAddress.slice(-4)}`}
        </MKButton>
      )}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="connect-wallet-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MKBox
          sx={{
            position: "relative",
            width: "90%",
            maxWidth: "400px",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "saturate(200%) blur(30px)",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MKBox display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <MKTypography variant="h6" component="h2">
              Connect Wallet
            </MKTypography>
            <Icon
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
              }}
              onClick={handleCloseModal}
            >
              close
            </Icon>
          </MKBox>

          <MKBox display="flex" flexDirection="column" gap={2}>
            {walletOptions.map((wallet) => (
              <MKButton
                key={wallet.id}
                variant="outlined"
                color="dark"
                fullWidth
                onClick={() => handleConnect(wallet.id)}
                startIcon={<Icon>{wallet.icon}</Icon>}
                sx={{
                  py: 2,
                  display: "flex",
                  justifyContent: "flex-start",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                {wallet.name}
              </MKButton>
            ))}
          </MKBox>
        </MKBox>
      </Modal>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.1)",
          }}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </MKBox>
  );
}

WalletConnector.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default WalletConnector;

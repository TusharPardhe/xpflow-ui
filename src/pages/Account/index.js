import React, { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

// Images
import bgImage from "assets/images/bg-coworking.jpeg";
import { useWallet } from "xrpl-connect/context";
import { useNavigate } from "react-router-dom";
import MKLoader from "components/MKLoader";

function Account() {
  const navigate = useNavigate();
  const { xrpAddress, disconnect, apiEndpoint } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (xrpAddress) fetchAccountData();
  }, [xrpAddress]);

  const fetchAccountData = async () => {
    try {
      setIsLoading(true);
      const [donationsResponse, detailsResponse] = await Promise.all([
        fetch(`${apiEndpoint}/account/donations?xrpAddress=${xrpAddress}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetch(`${apiEndpoint}/account/details?xrpAddress=${xrpAddress}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      if (!donationsResponse.ok || !detailsResponse.ok) {
        throw new Error("Failed to fetch account data");
      }

      const [donations, details] = await Promise.all([
        donationsResponse.json(),
        detailsResponse.json(),
      ]);

      setAccountData({
        ...details,
        fundDistribution: donations.fundDistribution || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonateNow = () => {
    console.log("Donating amount:", donationAmount);
    setModalOpen(false);
    setDonationAmount("");
  };

  const handleDisconnect = () => {
    disconnect();
    navigate("/");
  };

  const handleDonationAmountChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = parseFloat(rawValue);

    if (rawValue === "") {
      setDonationAmount(rawValue);
      return;
    }

    if (isNaN(numericValue) || numericValue < 0 || numericValue > accountData.availableBalance) {
      return;
    }

    setDonationAmount(numericValue);
  };

  if (isLoading) {
    return <MKLoader show message="Loading account data..." />;
  }

  return (
    <>
      <MKBox
        minHeight={{ xs: "40vh", md: "50vh" }}
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                fontSize: {
                  xs: size["2xl"],
                  sm: size["3xl"],
                  md: "inherit",
                },
                padding: { xs: 2, md: 0 },
              })}
            >
              Your Account
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              opacity={0.8}
              mt={1}
              mb={3}
              px={2}
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Manage your contributions and see your impact
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: { xs: 2, md: 3 },
          mx: { xs: 1, sm: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Grid container justifyContent="center">
          <Grid container spacing={3} sx={{ px: { xs: 1, sm: 0 } }}>
            <Grid item xs={12} lg={4}>
              <MKBox mb={3}>
                <MKTypography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                >
                  Account Details
                </MKTypography>
                <MKTypography
                  variant="body2"
                  color="text"
                  mt={1}
                  sx={{
                    wordBreak: "break-all",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  XRP Address: {xrpAddress}
                </MKTypography>
                <MKTypography
                  variant="h3"
                  color="info"
                  mt={2}
                  sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}
                >
                  {accountData.availableBalance}
                </MKTypography>
                <MKButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  sx={{
                    mt: 4,
                    py: { xs: 1.5, md: 2 },
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Donate
                </MKButton>
                <MKButton
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: { xs: 1.5, md: 2 },
                  }}
                  onClick={handleDisconnect}
                >
                  <Icon sx={{ mr: 1 }}>logout</Icon>
                  Disconnect Account
                </MKButton>
              </MKBox>
            </Grid>
            <Grid item xs={12} lg={8}>
              <MKTypography
                variant="h4"
                fontWeight="bold"
                mb={3}
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                Fund Distribution
              </MKTypography>
              <Grid
                container
                sx={{
                  width: "100%",
                  margin: 0,
                  justifyContent: { xs: "center", lg: "flex-start" },
                }}
                gap={3}
              >
                {accountData.fundDistribution.map((fund) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={fund.name}
                    sx={{
                      maxWidth: { xs: "100%", sm: "50%", md: "33.333%" },
                    }}
                    className="fund-card"
                  >
                    <Card>
                      <MKBox
                        variant="gradient"
                        bgColor="info"
                        coloredShadow="info"
                        borderRadius="xl"
                        p={{ xs: 2, md: 3 }}
                        textAlign="center"
                      >
                        <MKTypography
                          variant="h3"
                          color="white"
                          mt={1}
                          sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}
                        >
                          {fund.percentage}%
                        </MKTypography>
                        <MKTypography
                          variant="h5"
                          color="white"
                          mt={1}
                          sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                        >
                          {fund.amount}
                        </MKTypography>
                      </MKBox>
                      <MKBox p={{ xs: 2, md: 3 }} textAlign="center">
                        <MKTypography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                        >
                          {fund.name}
                        </MKTypography>
                      </MKBox>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* Donation Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: "400px",
            width: "100%",
            p: { xs: 2, md: 3 },
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            m: 2,
          }}
        >
          <MKBox display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <MKTypography
              variant="h4"
              fontWeight="medium"
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              Make a Donation
            </MKTypography>
            <Icon
              sx={{
                cursor: "pointer",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
              onClick={() => setModalOpen(false)}
            >
              close
            </Icon>
          </MKBox>
          <Divider sx={{ my: 2 }} />
          <MKBox component="form" role="form">
            <MKBox mb={2}>
              <MKInput
                type="number"
                label="Amount (XRP)"
                fullWidth
                value={donationAmount}
                onChange={handleDonationAmountChange}
                autoComplete="off"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  },
                }}
              />
            </MKBox>
            <MKButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={handleDonateNow}
              disabled={donationAmount === "" || donationAmount <= 0}
              sx={{
                mt: 2,
                py: { xs: 1.5, md: 2 },
              }}
            >
              Donate Now
            </MKButton>
          </MKBox>
        </Card>
      </Modal>
    </>
  );
}

export default Account;

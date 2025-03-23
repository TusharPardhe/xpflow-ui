import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="account_balance_wallet"
                title="XPAYFLOW"
                description="Blockchain-based funding and donation platform with complete transparency and efficiency in fund distribution."
              />
              <RotatingCardBack
                image={bgBack}
                title="How It Works"
                description="Connect your wallet, select a fund, and watch your contribution automatically distribute to multiple wallets based on the project's allocation plan."
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="account_balance_wallet"
                  title="Connect Your Wallet"
                  description="Securely connect your XRPL-compatible wallet to the XPAYFLOW platform."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="add_shopping_cart"
                  title="Donate hassle free"
                  description="Support your community with faster and secure donation"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="attach_money"
                  title="Automatic Distribution"
                  description="Your contribution is automatically distributed to designated wallets based on the project holder's preset allocation."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="toll"
                  title="On-Chain Transparency"
                  description="Track every transaction on-chain to see exactly where funds are going in real-time."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Key Features Section */}
        <MKBox mt={10}>
          <Grid container spacing={3}>
            <Grid item xs={12} textAlign="center" mb={4}>
              <MKTypography variant="h3" fontWeight="bold">
                Key Features
              </MKTypography>
            </Grid>
            <Grid item xs={12} md={4}>
              <DefaultInfoCard
                icon="verified"
                title="Decentralized & Transparent"
                description="All transactions are recorded on the XRPL for full accountability."
                direction="center"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DefaultInfoCard
                icon="category"
                title="Versatile Funding"
                description="Supports both charitable donations and private or public project funding."
                direction="center"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DefaultInfoCard
                icon="security"
                title="Secure & Efficient"
                description="Eliminates intermediaries, ensuring funds reach their intended recipients without delays."
                direction="center"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DefaultInfoCard
                icon="settings"
                title="Project Holder Control"
                description="Fund organizers determine allocations in advance, ensuring clarity for donors and participants."
                direction="center"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DefaultInfoCard
                icon="track_changes"
                title="Real-Time Tracking"
                description="Users can view how contributions are distributed with blockchain-verified transparency."
                direction="center"
              />
            </Grid>
          </Grid>
        </MKBox>
      </Container>
    </MKBox>
  );
}

export default Information;

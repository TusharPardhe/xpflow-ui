// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TwitterIcon from "@mui/icons-material/Twitter";

// XPayFlow components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/examples/blog2.jpg";

function Contact() {
  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item>
          <MKBox
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mt={10}
            mb={4}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={5}
                position="relative"
                px={0}
                sx={{
                  backgroundImage: ({
                    palette: { gradients },
                    functions: { rgba, linearGradient },
                  }) =>
                    `${linearGradient(
                      rgba(gradients.dark.main, 0.8),
                      rgba(gradients.dark.state, 0.8)
                    )}, url(${bgImage})`,
                  backgroundSize: "cover",
                }}
              >
                <MKBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <MKBox
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    my="auto"
                  >
                    <MKTypography variant="h3" color="white" mb={3} textAlign="center">
                      Join Our Community
                    </MKTypography>
                    <MKTypography
                      variant="body2"
                      color="white"
                      opacity={0.8}
                      mb={4}
                      textAlign="center"
                      px={3}
                    >
                      Have questions about XPAYFLOW? Connect with our community for help and
                      updates.
                    </MKTypography>
                    <MKBox>
                      <MKButton
                        component="a"
                        href="https://twitter.com/xpayflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="text"
                        color="white"
                        size="large"
                      >
                        <TwitterIcon style={{ fontSize: "1.25rem", marginRight: "8px" }} />
                        Connect with us on X
                      </MKButton>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid item xs={12} lg={7}>
                <MKBox component="form" p={2} method="post">
                  <MKBox pt={0.5} pb={3} px={3}>
                    <MKTypography variant="h4" mb={3} mt={3}>
                      Frequently Asked Questions
                    </MKTypography>

                    <Accordion defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <MKTypography variant="h6">What is XPAYFLOW?</MKTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <MKTypography variant="body2">
                          XPAYFLOW is an innovative blockchain-based funding and donation platform
                          built on the XRPL (XRP Ledger). Designed for both charitable giving and
                          project funding, XPAYFLOW ensures complete transparency and efficiency in
                          fund distribution. Users can connect their wallets and contribute to a
                          designated fund, which is automatically allocated to multiple wallets or
                          projects according to the project holder's predetermined distribution
                          plan.
                        </MKTypography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <MKTypography variant="h6">
                          Which wallets are supported by XPAYFLOW?
                        </MKTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <MKTypography variant="body2">
                          XPAYFLOW exclusively supports XRPL-based wallets. Currently, you can use
                          GemWallet and Xaman (formerly XUMM) to connect to our platform. These
                          wallets provide secure access to the XRP Ledger and allow for seamless
                          interaction with our smart contracts and distribution mechanisms.
                        </MKTypography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <MKTypography variant="h6">
                          How does the fund distribution work?
                        </MKTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <MKTypography variant="body2">
                          When you contribute to a project or fund on XPAYFLOW, your contribution is
                          automatically distributed to designated wallets based on the project
                          holder's preset allocation plan. This distribution happens on-chain and is
                          completely transparent. The project creator determines in advance how
                          funds will be allocated (for example, 40% to development, 30% to
                          marketing, 20% to operations, and 10% to charity), and this distribution
                          occurs automatically when you make your contribution.
                        </MKTypography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <MKTypography variant="h6">
                          How can I track where my donations go?
                        </MKTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <MKTypography variant="body2">
                          One of XPAYFLOW's key features is full on-chain transparency. Every
                          transaction is recorded on the XRP Ledger and can be tracked in real-time.
                          When you make a contribution, you'll receive a transaction hash that you
                          can use to verify your transaction on the XRPL explorer. Additionally, our
                          platform provides a dashboard where you can view all your contributions
                          and track how they've been distributed to various recipients as specified
                          by the project's allocation plan.
                        </MKTypography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <MKTypography variant="h6">Is XPAYFLOW secure?</MKTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <MKTypography variant="body2">
                          Absolutely. XPAYFLOW leverages the security and reliability of the XRP
                          Ledger, a decentralized blockchain that has been operating securely since
                          2012. Our platform eliminates intermediaries in the funding process,
                          reducing points of failure and potential for fraud. All smart contracts
                          governing fund distribution have been thoroughly audited. Additionally,
                          since all transactions occur on-chain, there's complete transparency and
                          accountability, allowing users to verify where every contribution goes.
                        </MKTypography>
                      </AccordionDetails>
                    </Accordion>
                  </MKBox>
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Contact;

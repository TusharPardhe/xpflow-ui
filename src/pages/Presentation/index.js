import React, { useRef, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import bgImage from "assets/images/bg-wallpaper.jpg";
import Information from "pages/Presentation/sections/Information";
import { KeyboardArrowDown } from "@mui/icons-material";

function Presentation() {
  // Create a ref for the Information section
  const informationSectionRef = useRef(null);

  // Scroll function using ref
  const scrollToNextSection = useCallback(() => {
    informationSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <MKBox
        position="relative"
        minHeight="100vh"
        width="100%"
        sx={{
          overflow: "hidden",
        }}
      >
        {/* Blurred Background Layer */}
        <MKBox
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "blur(8px)",
            zIndex: 1,
          }}
        />

        {/* Content Layer */}
        <MKBox
          position="absolute"
          zIndex={2}
          sx={{
            height: "100%",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
              <MKTypography
                variant="h1"
                color="white"
                mt={-6}
                mb={1}
                sx={({ breakpoints, typography: { size } }) => ({
                  textAlign: "center",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                XPayFlow
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                textAlign="center"
                px={{ xs: 6, lg: 12 }}
                mt={1}
                sx={{
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              >
                An innovative blockchain-based funding and donation platform
              </MKTypography>

              {/* Scroll Down Arrows */}
              <MKButton
                variant="text"
                color="white"
                onClick={scrollToNextSection}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 3,
                  minWidth: "auto",
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiTouchRipple-root": {
                    display: "none",
                  },
                }}
              >
                {[1, 2, 3].map((_, index) => (
                  <KeyboardArrowDown
                    key={index}
                    sx={{
                      fontSize: 40,
                      color: "white",
                      opacity: 0.7 - index * 0.2,
                      animation: "bounce 1.5s infinite",
                      animationDelay: `${index * 0.2}s`,
                      "@keyframes bounce": {
                        "0%, 100%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(10px)" },
                      },
                    }}
                  />
                ))}
              </MKButton>
            </Grid>
          </Container>
        </MKBox>
      </MKBox>

      {/* Information Section with Ref */}
      <Card
        ref={informationSectionRef}
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
      </Card>

      <MKBox pt={6} px={1} mt={6}></MKBox>
    </>
  );
}

export default Presentation;

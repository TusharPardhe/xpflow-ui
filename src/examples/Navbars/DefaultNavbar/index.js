import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { WalletConnector } from "xrpl-connect/index";
import logoImage from "assets/images/xpayflow-transparentbg.png";

function DefaultNavbar({ transparent, light, sticky, relative }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    window.addEventListener("resize", displayMobileNavbar);
    displayMobileNavbar();

    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        ...(sticky ? { position: "sticky", top: 0, zIndex: 10 } : {}),
        px: { xs: 2, sm: 3, lg: 4 },
      }}
    >
      <MKBox
        py={1}
        px={{ xs: 2, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : { xs: 0, sm: 3 }}
        width={relative ? "100%" : { xs: "100%", lg: "calc(100% - 48px)" }}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
          overflow: "hidden",
        })}
      >
        <MKBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: { xs: "wrap", lg: "nowrap" },
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* Brand Image */}
          <MKBox
            component={Link}
            to="/"
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            width={{ xs: "50%", sm: "auto" }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "center" },
            }}
          >
            <MKBox
              component="img"
              src={logoImage}
              alt="Brand Logo"
              height="40px"
              width={{ xs: "120px", sm: "150px" }}
              maxWidth="200px"
              sx={{
                objectFit: "contain",
                display: "block",
              }}
            />
          </MKBox>

          {/* Mobile Menu Icon */}
          <MKBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            color={transparent ? "white" : "inherit"}
            sx={{
              cursor: "pointer",
              marginLeft: "auto",
              order: 3,
            }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </MKBox>

          {/* Desktop Navigation */}
          <MKBox
            color="inherit"
            display={{ xs: "none", lg: "flex" }}
            ml="auto"
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <MKTypography
                key={item.name}
                component={Link}
                to={item.path}
                variant="button"
                color={light ? "white" : "dark"}
                fontWeight="regular"
                py={1.5}
                px={2}
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {item.name}
              </MKTypography>
            ))}
          </MKBox>

          {/* Wallet Connector */}
          <MKBox
            sx={{
              order: { xs: 4, lg: 3 },
              width: { xs: "100%", lg: "auto" },
              mt: { xs: 1, lg: 0 },
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <WalletConnector
              onSuccess={(address) => console.log(`Connected: ${address}`)}
              onError={(error) => console.error(error)}
            />
          </MKBox>
        </MKBox>

        {/* Mobile Navigation */}
        {mobileView && (
          <MKBox
            bgColor={transparent ? "white" : "transparent"}
            shadow={transparent ? "lg" : "none"}
            borderRadius="xl"
            px={transparent ? 2 : 0}
            py={mobileNavbar ? 2 : 0}
            display={mobileNavbar ? "block" : "none"}
            width="100%"
          >
            {navItems.map((item) => (
              <MKTypography
                key={item.name}
                component={Link}
                to={item.path}
                variant="button"
                color="dark"
                fontWeight="regular"
                py={1.5}
                px={2}
                display="block"
                textAlign="center"
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                onClick={() => setMobileNavbar(false)}
              >
                {item.name}
              </MKTypography>
            ))}
          </MKBox>
        )}
      </MKBox>
    </Container>
  );
}

// Setting default values for the props
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  sticky: false,
  relative: false,
};

// Typechecking props
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
};

export default DefaultNavbar;

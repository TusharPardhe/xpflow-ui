import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import breakpoints from "assets/theme/base/breakpoints";
import { WalletConnector } from "xrpl-connect/index";

function DefaultNavbar({ brandImage, transparent, light, sticky, relative }) {
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
    <Container sx={sticky ? { position: "sticky", top: 0, zIndex: 10 } : null}>
      <MKBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MKBox display="flex" justifyContent="space-between" alignItems="center">
          {/* Brand Image */}
          <MKBox
            component={Link}
            to="/"
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            pl={relative || transparent ? 0 : { xs: 0, lg: 1 }}
          >
            <MKBox
              component="img"
              src={brandImage}
              alt="Brand Logo"
              height="40px"
              sx={{ objectFit: "contain" }}
            />
          </MKBox>

          {/* Desktop Navigation */}
          <MKBox color="inherit" display={{ xs: "none", lg: "flex" }} ml="auto">
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
          <MKBox ml={{ xs: "auto", lg: 0 }}>
            <WalletConnector
              onSuccess={(address) => console.log(`Connected: ${address}`)}
              onError={(error) => console.error(error)}
            />
          </MKBox>

          {/* Mobile Menu Icon */}
          <MKBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color={transparent ? "white" : "inherit"}
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
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
  brandImage: "/path-to-your-logo.png",
  transparent: false,
  light: false,
  sticky: false,
  relative: false,
};

// Typechecking props
DefaultNavbar.propTypes = {
  brandImage: PropTypes.string,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
};

export default DefaultNavbar;

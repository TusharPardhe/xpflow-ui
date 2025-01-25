import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// XPayFlow themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// XPayFlow routes
import routes from "routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Contact from "pages/LandingPages/Author/sections/Contact";
import AboutUs from "pages/LandingPages/AboutUs";
import Account from "pages/Account";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          color: "info",
          label: "Connect Wallet",
          brand: "",
        }}
        sticky
      />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Presentation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

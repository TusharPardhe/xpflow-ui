import React from "react";
import PropTypes from "prop-types";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function MKLoader({ message, show }) {
  return (
    <Backdrop
      open={show}
      sx={{
        backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <MKBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={3}
      >
        <CircularProgress color="info" size={60} thickness={4} sx={{ mb: 3 }} />
        {message && (
          <MKTypography
            variant="h6"
            color="dark"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              maxWidth: "300px",
            }}
          >
            {message}
          </MKTypography>
        )}
      </MKBox>
    </Backdrop>
  );
}

MKLoader.defaultProps = {
  message: "Loading...",
  show: false,
};

MKLoader.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
};

export default MKLoader;

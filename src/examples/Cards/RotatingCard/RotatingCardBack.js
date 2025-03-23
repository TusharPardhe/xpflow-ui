import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function RotatingCardBack({ color, image, title, description }) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      coloredShadow={color}
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      zIndex={5}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.85),
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.85)
          )}, url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <MKBox pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
        <MKTypography variant="h3" color="white" gutterBottom>
          {title}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8}>
          {description}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCardBack
RotatingCardBack.defaultProps = {
  color: "info",
};

// Typechecking props for the RotatingCardBack
RotatingCardBack.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

export default RotatingCardBack;

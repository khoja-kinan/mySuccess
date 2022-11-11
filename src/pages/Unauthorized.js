import { motion } from "framer-motion";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Unauthorized() {
  const navigate = useNavigate();
  const handeClickBack = () => {
    navigate(-1);
  };
  return (
    <RootStyle title="Unauthorized | Najahe">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, you are Unauthorized to access this page !
              </Typography>
            </motion.div>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/401.jpg"
                sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button size="large" variant="contained" onClick={handeClickBack}>
              Go Back
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}

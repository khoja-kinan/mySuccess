import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import Iconify from "../../components/Iconify";
import MenuPopover from "../../components/MenuPopover";
//

import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { logOutUrl } from "../../constants/urls";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  /* {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "#",
  }, */
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { t } = useTranslation();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [LoadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const token = localStorage.getItem("NToken");

  const logOut = () => {
    setLoadingBtn(true);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    const data = {};
    axios
      .post(logOutUrl, data, { headers })
      .then((response) => {
        localStorage.removeItem("NToken");
        localStorage.removeItem("Nusername");
        localStorage.removeItem("Nrole_name");
        localStorage.removeItem("Nroles");
        setLoadingBtn(false);
        navigate("/");
      })
      .catch((error) => {
        setLoadingBtn(false);
        console.error("There was an error!", error);
      });
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={""} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {localStorage.getItem("Nusername")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {localStorage.getItem("Nrole_name")}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <LoadingButton
            loading={LoadingBtn}
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={logOut}
          >
            {t("description.AccountPopoverLogout")}
          </LoadingButton>
        </Box>
      </MenuPopover>
    </>
  );
}

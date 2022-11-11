import { useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
//
import Iconify from "./Iconify";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "#495676",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block", bgcolor: "#495676" },
  };

  const activeSubStyle = {
    color: "#495676",
    fontWeight: "fontWeightMedium",
  };
  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { t } = useTranslation();
  const role_name = localStorage.getItem("Nrole_name");

  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  const sidebarConfig =
    role_name === "Admin"
      ? [
          {
            title: t("description.sideBarDashboard"),
            path: "/dashboard/app",
            icon: getIcon("eva:pie-chart-2-fill"),
          },
          {
            title: "مدراء النظام",
            path: "/dashboard/admins",
            icon: getIcon("wpf:administrator"),
          },
          {
            title: "الأساتذة",
            path: "/dashboard/teachers",
            icon: getIcon("la:chalkboard-teacher"),
          },
          {
            title: "الطلاب",
            path: "/dashboard/user",
            icon: getIcon("ph:student-fill"),
          },
          {
            title: "المكتبات",
            path: "/dashboard/libraries",
            icon: getIcon("fluent:library-28-filled"),
          },
          {
            title: "المواد",
            path: "/dashboard/courses",
            icon: getIcon("clarity:folder-open-solid"),
          },
          {
            title: "الدعم النفسي",
            path: "/dashboard/support",
            icon: getIcon("bx:support"),
          },
          {
            title: "الأسئلة",
            path: "/dashboard/questions",
            icon: getIcon("akar-icons:chat-question"),
          },
          {
            title: "حول التطبيق",
            path: "/dashboard/about",
            icon: getIcon("cib:about-me"),
          },
          {
            title: "سياسة الخصوصية",
            path: "/dashboard/terms-of-service",
            icon: getIcon("ic:baseline-privacy-tip"),
          },
        ]
      : role_name === "SuperVisor"
      ? [
          {
            title: "الطلاب",
            path: "/dashboard/user",
            icon: getIcon("ph:student-fill"),
          },
          {
            title: "المكتبات",
            path: "/dashboard/libraries",
            icon: getIcon("fluent:library-28-filled"),
          },
        ]
      : role_name === "library"
      ? [
          {
            title: "سجل الشحن الخاص بي",
            path: `/dashboard/library-charge-record/${localStorage.getItem(
              "NuserD"
            )}`,
            icon: getIcon("carbon:table-split"),
          },
          {
            title: "شحن رصيد طالب",
            path: "/dashboard/charge-user-balance",
            icon: getIcon("mdi:credit-card-plus"),
          },
        ]
      : [
          {
            title: "الأسئلة",
            path: "/dashboard/questions",
            icon: getIcon("akar-icons:chat-question"),
          },
        ];

  return (
    <Box {...other}>
      <List disablePadding>
        {sidebarConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}

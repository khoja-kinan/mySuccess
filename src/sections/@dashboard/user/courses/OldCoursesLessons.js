import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// component
import Iconify from "../../../../components/Iconify";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CourseStatusURL } from "../../../../constants/urls";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// ----------------------------------------------------------------------

export default function OldCoursesLessons({
  user,
  token,
  setLoadingBtn,
  loadingBtn,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="bi:eye-fill" width={20} height={20} />
      </IconButton>

      <Dialog
        disableEscapeKeyDown
        open={isOpen}
        fullWidth
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>دورات مادة {user.name}</DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
            height: 120,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Link
            to={`/dashboard/old-courses/${user.id}/video-units`}
            style={{ textDecoration: "none" }}
          >
            <Button
              sx={{
                "& .MuiButton-endIcon": {
                  margin: "0 ",
                },
              }}
              variant="outlined"
              endIcon={<VideoLibraryIcon sx={{ margin: "0 0.5rem" }} />}
            >
              فيديوهات
            </Button>
          </Link>
          {/* <Link
            to={`/dashboard/old-courses/${user.id}/material-units`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              sx={{
                "& .MuiButton-endIcon": {
                  margin: "0 ",
                },
              }}
              endIcon={<FileCopyIcon sx={{ margin: "0 0.5rem" }} />}
            >
              ملفات
            </Button>
          </Link> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
  FormControl,
  TextField,
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
import { CourseVideoUnitsURL, materialURL } from "../../../../constants/urls";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function UnitMaterialMoreMenu({
  user,
  token,
  setLoadingBtn,
  loadingBtn,
  courseId,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  /* 
      Edit unit
  */
  const [openEditUnit, setOpenEditUnit] = useState(false);
  const [VideoName, setVideoName] = useState(user.name);
  const [File, setFile] = useState(user.path);
  const [FilePages, setFilePages] = useState(user.pages);

  const handleChangeVideoName = (e) => {
    setVideoName(e.target.value);
  };
  const handleChangeFilePages = (e) => {
    setFilePages(e.target.value);
  };
  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClickOpenEditUnit = () => {
    setOpenEditUnit(true);
  };

  const handleCloseEditUnit = () => {
    setOpenEditUnit(false);
  };

  const handleSubmitEditUnit = () => {
    setLoadingBtn(true);
    const formData = new FormData();
    VideoName !== user.name && formData.append("name", VideoName);
    FilePages !== user.pages && formData.append("pages", FilePages);
    File !== user.path && formData.append("file", File);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${materialURL}update/${user.id}`, formData, {
        headers,
      })
      .then((response) => {
        setOpenEditUnit(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              setLoadingBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBtn(false);
        setOpenEditUnit(false);
        setIsOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  /* 
      Delete unit
  */
  const [openDeleteUnit, setOpenDeleteUnit] = useState(false);

  const handleClickOpenDeleteUnit = () => {
    setOpenDeleteUnit(true);
  };

  const handleCloseDeleteUnit = () => {
    setOpenDeleteUnit(false);
  };

  const handleSubmitDeleteUnit = () => {
    setLoadingBtn(true);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .delete(`${materialURL}${user.id}`, {
        headers,
      })
      .then((response) => {
        setOpenDeleteUnit(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              setLoadingBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBtn(false);

        setIsOpen(false);
        setOpenDeleteUnit(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Edit Unit  */}

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenEditUnit}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-2-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="تعديل الملف"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openEditUnit}
          onClose={handleCloseEditUnit}
        >
          <DialogTitle>تعديل الملف</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="اسم الملف"
                  variant="outlined"
                  onChange={handleChangeVideoName}
                  value={VideoName}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  type={"number"}
                  label="عدد الصفحات"
                  variant="outlined"
                  onChange={handleChangeFilePages}
                  value={FilePages}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <label for="file-upload" style={{ margin: "0.5rem 0" }}>
                  ملف الوحدة
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="pdf"
                  onChange={handleUploadFile}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditUnit}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton loading={loadingBtn} onClick={handleSubmitEditUnit}>
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Delete unit */}

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDeleteUnit}
        >
          <ListItemIcon>
            <Iconify icon="ic:baseline-delete" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="حذف الملف"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openDeleteUnit}
          onClose={handleCloseDeleteUnit}
        >
          <DialogTitle>حذف الملف</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من حذف هذا الملف ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDeleteUnit}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingBtn}
              onClick={handleSubmitDeleteUnit}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

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
import { aboutURL } from "../../../../constants/urls";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function AboutTeacherMoreMenu({
  user,
  token,
  setLoadingBtn,
  loadingBtn,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  /* 
      Edit unit
  */
  const [openEditUnit, setOpenEditUnit] = useState(false);
  const [TeacherName, setTeacherName] = useState(user.teacher_name);
  const [TeacherCourse, setTeacherCourse] = useState(user.teacher_course);
  const [TeacherFacebook, setTeacherFacebook] = useState(user.teacher_facebook);
  const [TeacherWhatsapp, setTeacherWhatsapp] = useState(user.teacher_whatsapp);
  const [TeacherTelegram, setTeacherTelegram] = useState(user.teacher_telegram);

  const handleChangeTeacherName = (e) => {
    setTeacherName(e.target.value);
  };

  const handleChangeTeacherCourse = (e) => {
    setTeacherCourse(e.target.value);
  };

  const handleChangeTeacherFacebook = (e) => {
    setTeacherFacebook(e.target.value);
  };

  const handleChangeTeacherWhatsapp = (e) => {
    setTeacherWhatsapp(e.target.value);
  };

  const handleChangeTeacherTelegram = (e) => {
    setTeacherTelegram(e.target.value);
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
    TeacherName !== user.teacher_name &&
      formData.append("teacher_name", TeacherName);
    TeacherCourse !== user.teacher_course &&
      formData.append("teacher_course", TeacherCourse);
    TeacherFacebook !== user.teacher_facebook &&
      formData.append(
        "teacher_facebook",
        TeacherFacebook === "" ? null : TeacherFacebook
      );
    TeacherWhatsapp !== user.teacher_whatsapp &&
      formData.append(
        "teacher_whatsapp",
        TeacherWhatsapp === "" ? null : TeacherWhatsapp
      );
    TeacherTelegram !== user.teacher_telegram &&
      formData.append(
        "teacher_telegram",
        TeacherTelegram === "" ? null : TeacherTelegram
      );

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${aboutURL}/${user.id}?_method=PUT`, formData, {
        headers,
      })
      .then((response) => {
        setOpenEditUnit(false);
        setIsOpen(false);
        setLoadingBtn(false);
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
      .delete(`${aboutURL}/${user.id}`, {
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
            primary="تعديل المعلومات"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openEditUnit}
          onClose={handleCloseEditUnit}
        >
          <DialogTitle>تعديل معلومات الاستاذ</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="اسم الاستاذ"
                  variant="outlined"
                  onChange={handleChangeTeacherName}
                  value={TeacherName}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="الاختصاص"
                  variant="outlined"
                  onChange={handleChangeTeacherCourse}
                  value={TeacherCourse}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="حساب فيس بوك"
                  variant="outlined"
                  type={"text"}
                  onChange={handleChangeTeacherFacebook}
                  value={TeacherFacebook}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="حساب واتس اب"
                  variant="outlined"
                  type={"text"}
                  onChange={handleChangeTeacherWhatsapp}
                  value={TeacherWhatsapp}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="حساب تيليغرام"
                  variant="outlined"
                  type={"text"}
                  onChange={handleChangeTeacherTelegram}
                  value={TeacherTelegram}
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
            primary="حذف الاستاذ"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openDeleteUnit}
          onClose={handleCloseDeleteUnit}
        >
          <DialogTitle>حذف الاستاذ</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من حذف هذا الاستاذ ؟
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

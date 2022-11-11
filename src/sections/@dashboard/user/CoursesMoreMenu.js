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
import Iconify from "../../../components/Iconify";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CourseStatusURL, CoursesURL } from "../../../constants/urls";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function CoursesMoreMenu({
  user,
  token,
  setLoadingBtn,
  loadingBtn,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  /* 
      Disable User 
  */
  const [openDisableUser, setOpenDisableUser] = useState(false);

  const handleClickOpenDisableUser = () => {
    setOpenDisableUser(true);
  };

  const handleCloseDisableUser = () => {
    setOpenDisableUser(false);
  };

  const handleSubmitDisableUser = () => {
    setLoadingBtn(true);
    const data = {
      status: false,
      course_id: user.id,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CourseStatusURL}`, data, {
        headers,
      })
      .then((response) => {
        setOpenDisableUser(false);
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
        setOpenDisableUser(false);
        setIsOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  /* 
      Activate User 
  */
  const [openActivateUser, setOpenActivateUser] = useState(false);

  const handleClickOpenActivateUser = () => {
    setOpenActivateUser(true);
  };

  const handleCloseActivateUser = () => {
    setOpenActivateUser(false);
  };

  const handleSubmitActivateUser = () => {
    setLoadingBtn(true);
    const data = {
      status: true,
      course_id: user.id,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CourseStatusURL}`, data, {
        headers,
      })
      .then((response) => {
        setOpenActivateUser(false);
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
        setOpenActivateUser(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  /* course Price */
  const [OpenCoursePriceEdit, setOpenCoursePriceEdit] = useState(false);
  const [Videoprice, setVideoPrice] = useState(user.video_price);
  const [OldVideoprice, setOldVideoPrice] = useState(user.previous_video_price);

  const handleClickOpenCoursePriceEdit = () => {
    setOpenCoursePriceEdit(true);
  };

  const handleCloseCoursePriceEdit = () => {
    setOpenCoursePriceEdit(false);
  };

  const handleChangeCourseVideoPrice = (e) => {
    setVideoPrice(e.target.value);
  };

  const handleChangeOldCourseVideoPrice = (e) => {
    setOldVideoPrice(e.target.value);
  };

  const handleSubmitEditCoursePrice = () => {
    setLoadingBtn(true);
    const data = {
      video_price: Videoprice,
      previous_video_price: OldVideoprice,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CoursesURL}/${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenCoursePriceEdit(false);
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
        setOpenCoursePriceEdit(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  /* course Teacher */
  const [OpenCourseTeacherEdit, setOpenCourseTeacherEdit] = useState(false);
  const [Teacher, setTeacher] = useState(user.teacher_name);

  const handleClickOpenCourseTeacherEdit = () => {
    setOpenCourseTeacherEdit(true);
  };

  const handleCloseCourseTeacherEdit = () => {
    setOpenCourseTeacherEdit(false);
  };

  const handleChangeCourseTeacher = (e) => {
    setTeacher(e.target.value);
  };

  const handleSubmitEditCourseTeacher = () => {
    setLoadingBtn(true);
    const data = {
      teacher_name: Teacher,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CoursesURL}/${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenCourseTeacherEdit(false);
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
        setOpenCourseTeacherEdit(false);
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
        {/* Disable User */}
        {user.available === 1 && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDisableUser}
          >
            <ListItemIcon>
              <Iconify icon="healthicons:no" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="إلغاء تفعيل المادة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDisableUser}
          onClose={handleCloseDisableUser}
        >
          <DialogTitle>إلغاء تفعيل المادة</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من إلغاء تفعيل هذه المادة ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDisableUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingBtn}
              onClick={handleSubmitDisableUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Activate User */}
        {user.available === 0 && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenActivateUser}
          >
            <ListItemIcon>
              <Iconify icon="dashicons:yes-alt" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="تفعيل المادة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openActivateUser}
          onClose={handleCloseActivateUser}
        >
          <DialogTitle>تفعيل المادة</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من تفعيل هذا المادة ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseActivateUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingBtn}
              onClick={handleSubmitActivateUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        {/* Course Price */}
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenCoursePriceEdit}
        >
          <ListItemIcon>
            <Iconify icon="bx:money-withdraw" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="تعديل سعر المادة"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={OpenCoursePriceEdit}
          onClose={handleCloseCoursePriceEdit}
        >
          <DialogTitle>تعديل سعر المادة</DialogTitle>
          <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="سعر الفيديوهات للدروس"
                  variant="outlined"
                  onChange={handleChangeCourseVideoPrice}
                  value={Videoprice}
                />
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="سعر الفيديوهات للدورات"
                  variant="outlined"
                  onChange={handleChangeOldCourseVideoPrice}
                  value={OldVideoprice}
                />
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button onClick={handleCloseCoursePriceEdit}>
                    {t("description.Cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={loadingBtn}
                    onClick={handleSubmitEditCoursePrice}
                  >
                    {t("description.Ok")}
                  </LoadingButton>
                </DialogActions>
              </FormControl>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Course Teacher */}
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenCourseTeacherEdit}
        >
          <ListItemIcon>
            <Iconify
              icon="fluent-emoji-high-contrast:man-teacher"
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText
            primary="تعديل مدرس المادة"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={OpenCourseTeacherEdit}
          onClose={handleCloseCourseTeacherEdit}
        >
          <DialogTitle>تعديل مدرس المادة</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="اسم مدرس المادة"
                  variant="outlined"
                  onChange={handleChangeCourseTeacher}
                  value={Teacher}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseCourseTeacherEdit}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingBtn}
              onClick={handleSubmitEditCourseTeacher}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

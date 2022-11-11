import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Avatar,
  Typography,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  ActivateUrl,
  ActivateUserUrl,
  ChargePointsUrl,
  DisableUserUrl,
  DiscountPointsUrl,
  notificationURL,
  storageUrl,
  userCrudeUrl,
} from "../../../constants/urls";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function UserMoreMenu1({
  user,
  token,
  setLoadingUserBtn,
  loadingUserBtn,
  roles,
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
    setLoadingUserBtn(true);
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${DisableUserUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenDisableUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
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
    setLoadingUserBtn(true);
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ActivateUserUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenActivateUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);

        setIsOpen(false);
        setOpenActivateUser(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };
  /* 
      Activate PhoneNumber  
  */
  const [openActivatePhoneNumber, setOpenActivatePhoneNumber] = useState(false);

  const handleClickOpenActivatePhoneNumber = () => {
    setOpenActivatePhoneNumber(true);
  };

  const handleCloseActivatePhoneNumber = () => {
    setOpenActivatePhoneNumber(false);
  };

  const handleSubmitActivatePhoneNumber = () => {
    setLoadingUserBtn(true);
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ActivateUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenActivatePhoneNumber(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenActivatePhoneNumber(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* 
    Charge User Balance
  */

  const [openEditBalance, setOpenEditBalance] = useState(false);
  const [UserBalance, setUserBalance] = useState("");

  const handleChangeUserBalance = (event) => {
    setUserBalance(event.target.value);
  };

  const handleClickOpenEditBalance = () => {
    setOpenEditBalance(true);
  };

  const handleCloseEditBalance = () => {
    setOpenEditBalance(false);
  };

  const handleSubmitEditBalance = () => {
    setLoadingUserBtn(true);
    const data = {
      points: UserBalance,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ChargePointsUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenEditBalance(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenEditBalance(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* 
    discount User Balance
  */

  const [openDiscountBalance, setOpenDiscountBalance] = useState(false);
  const [DiscountBalance, setDiscountBalance] = useState("");

  const handleChangeDiscountBalance = (event) => {
    setDiscountBalance(event.target.value);
  };

  const handleClickOpenDiscountBalance = () => {
    setOpenDiscountBalance(true);
  };

  const handleCloseDiscountBalance = () => {
    setOpenDiscountBalance(false);
  };

  const handleSubmitDiscountBalance = () => {
    setLoadingUserBtn(true);
    const data = {
      points: DiscountBalance,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${DiscountPointsUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenDiscountBalance(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenDiscountBalance(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* 
     Delete user
  */
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const handleClickOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };

  const handleSubmitDeleteUser = () => {
    setLoadingUserBtn(true);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .delete(`${userCrudeUrl}${user.id}`, {
        headers,
      })
      .then((response) => {
        setOpenDeleteUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenEditBalance(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* 
     Update User
  */

  const [openEditUser, setOpenEditUser] = useState(false);
  const [Username, setUsername] = useState(user.name);
  const [Phone, setPhone] = useState(user.phone_number);
  const [Age, setAge] = useState(user.age);
  const [City, setCity] = useState(user.city);
  const [Class, setClass] = useState(user.class);
  const [canBuy, setCanBuy] = useState(user.can_buy);
  const [UserImageToShow, setUserImageToShow] = useState(user.image);
  const [previewUserImage, setPreviewUserImage] = useState(null);
  const [UserImageToUpload, setUserImageToUpload] = useState(null);
  const [password, setPassword] = useState();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeClass = (event) => {
    setClass(event.target.value);
  };

  const handleChangeCanBuy = (event) => {
    setCanBuy(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };

  const handleCaptureUserImage = (e) => {
    setUserImageToShow(null);
    setUserImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitEditUser = () => {
    setLoadingUserBtn(true);
    const formData = new FormData();
    Username !== user.name && formData.append("name", Username);
    Phone !== user.phone_number && formData.append("phone_number", Phone);
    Age !== user.age && formData.append("age", Age);
    password && formData.append("password", password);
    password && formData.append("password_confirmation", password);
    City !== user.city && formData.append("city", City);
    Class !== user.class && formData.append("class", Class);
    canBuy !== user.can_buy && formData.append("can_buy", canBuy);
    UserImageToUpload !== null && formData.append("image", UserImageToUpload);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(`${userCrudeUrl}${user.id}?_method=PUT`, formData, {
        headers,
      })
      .then((response) => {
        setLoadingUserBtn(false);
        setOpenEditUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenEditUser(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* 
   Send Message
  */

  const [openMessage, setOpenMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [Type, setType] = useState("");

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleClickOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  const handleSubmitMessage = () => {
    setLoadingUserBtn(true);
    const data = {
      user_id: user.id.toString(),
      text: Message,
      type: Type,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${notificationURL}`, data, {
        headers,
      })
      .then((response) => {
        setOpenMessage(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenMessage(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
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
        {user.can_login === 1 && roles.includes("user-disable") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDisableUser}
          >
            <ListItemIcon>
              <Iconify
                icon="fluent:person-delete-24-filled"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="تعطيل الحساب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDisableUser}
          onClose={handleCloseDisableUser}
        >
          <DialogTitle>تعطيل حساب الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من تعطيل حساب هذا الطالب ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDisableUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitDisableUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Activate User */}
        {user.can_login === 0 && roles.includes("user-enable") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenActivateUser}
          >
            <ListItemIcon>
              <Iconify
                icon="fluent:person-add-20-filled"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="تفعيل الحساب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openActivateUser}
          onClose={handleCloseActivateUser}
        >
          <DialogTitle>تفعيل حساب الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من تفعيل حساب هذا الطالب ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseActivateUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitActivateUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        {/* Activate Phone Number */}
        {user.phone_number_verified === 0 && roles.includes("user-verify") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenActivatePhoneNumber}
          >
            <ListItemIcon>
              <Iconify
                icon="fluent:phone-checkmark-16-filled"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="تأكيد رقم الهاتف"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openActivatePhoneNumber}
          onClose={handleCloseActivatePhoneNumber}
        >
          <DialogTitle> تأكيد رقم هاتف الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من تأكيد رقم هاتف هذا الطالب ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseActivatePhoneNumber}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitActivatePhoneNumber}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        {/* Charge Balance */}
        {roles.includes("charge-user") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenEditBalance}
          >
            <ListItemIcon>
              <Iconify icon="mdi:credit-card-plus" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="شحن رصيد الطالب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openEditBalance}
          onClose={handleCloseEditBalance}
        >
          <DialogTitle>شحن رصيد الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label="الرصيد المراد إضافته"
                  variant="outlined"
                  onChange={handleChangeUserBalance}
                  value={UserBalance}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditBalance}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitEditBalance}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Discount Balance */}
        {roles.includes("discount-user") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDiscountBalance}
          >
            <ListItemIcon>
              <Iconify icon="mdi:credit-card-minus" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="خصم رصيد الطالب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDiscountBalance}
          onClose={handleCloseDiscountBalance}
        >
          <DialogTitle>خصم رصيد الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label="الرصيد المراد خصمه"
                  variant="outlined"
                  onChange={handleChangeDiscountBalance}
                  value={DiscountBalance}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDiscountBalance}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitDiscountBalance}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        {/* Delete user */}
        {roles.includes("user-delete") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDeleteUser}
          >
            <ListItemIcon>
              <Iconify icon="ic:baseline-delete" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="حذف حساب الطالب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDeleteUser}
          onClose={handleCloseDeleteUser}
        >
          <DialogTitle> حذف حساب الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من حذف حساب هذا الطالب ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDeleteUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitDeleteUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Edit user */}
        {roles.includes("user-edit") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenEditUser}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-2-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="تعديل بيانات الطالب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle>تعديل بيانات الطالب</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="اسم الطالب"
                  variant="outlined"
                  onChange={handleChangeUsername}
                  value={Username}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="عمر الطالب"
                  variant="outlined"
                  type={"number"}
                  onChange={handleChangeAge}
                  value={Age}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="كلمة السر"
                  variant="outlined"
                  onChange={handleChangePassword}
                  type="password"
                  value={password}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="رقم الهاتف"
                  variant="outlined"
                  type={"number"}
                  onChange={handleChangePhone}
                  value={Phone}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-dialog-select-label">المدينة</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={City}
                  onChange={handleChangeCity}
                  input={<OutlinedInput label="المدينة" />}
                >
                  <MenuItem value={"طرطوس"}>طرطوس</MenuItem>
                  <MenuItem value={"اللاذقية"}>اللاذقية</MenuItem>
                  <MenuItem value={"دمشق"}>دمشق</MenuItem>
                  <MenuItem value={"ريف دمشق"}>ريف دمشق</MenuItem>
                  <MenuItem value={"حلب"}>حلب</MenuItem>
                  <MenuItem value={"حمص"}>حمص</MenuItem>
                  <MenuItem value={"حماه"}>حماه</MenuItem>
                  <MenuItem value={"ادلب"}>ادلب</MenuItem>
                  <MenuItem value={"السويداء"}>السويداء</MenuItem>
                  <MenuItem value={"درعا"}>درعا</MenuItem>
                  <MenuItem value={"القنيطرة"}>القنيطرة</MenuItem>
                  <MenuItem value={"دير الزور"}>دير الزور</MenuItem>
                  <MenuItem value={"الحسكة"}>الحسكة</MenuItem>
                  <MenuItem value={"الرقة"}>الرقة</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-dialog-select-label">الصف</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={handleChangeClass}
                  value={Class}
                  input={<OutlinedInput label="الصف" />}
                >
                  <MenuItem value={"عاشر"}>عاشر</MenuItem>
                  <MenuItem value={"حادي عشر"}>حادي عشر</MenuItem>
                  <MenuItem value={"بكالوريا"}>بكالوريا</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-dialog-select-label">
                  إمكانية الشراء
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={canBuy}
                  onChange={handleChangeCanBuy}
                  input={<OutlinedInput label="إمكانية الشراء" />}
                >
                  <MenuItem value={0}>لا</MenuItem>
                  <MenuItem value={1}>نعم</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                width: "90%",
                marginTop: "1rem",
              }}
            >
              <Typography>صورة المستخدم</Typography>
              <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                <Box className="upload__image-wrapper">
                  {previewUserImage ? (
                    <Box className="image-item">
                      <Avatar
                        src={`${previewUserImage}`}
                        alt=""
                        sx={{ width: 200, height: 200, margin: "0 auto" }}
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewUserImage(null)}
                        >
                          حذف
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      sx={{ margin: "1rem 0" }}
                      variant="outlined"
                      component="label"
                    >
                      ارفع صورة المستخدم
                      <input
                        type="file"
                        accept="image/png"
                        hidden
                        onChange={handleCaptureUserImage}
                      />
                    </Button>
                  )}
                  {UserImageToShow && (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <Avatar
                        src={`${storageUrl}${UserImageToShow}`}
                        alt=""
                        sx={{ width: 200, height: 200, margin: "0 auto" }}
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setUserImageToShow(null)}
                        >
                          حذف
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitEditUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* charge user record */}
        {roles.includes("user-charge-list") && (
          <Link
            to={`/dashboard/user-charge-record/${user.id}`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem sx={{ color: "text.secondary" }}>
              <ListItemIcon>
                <Iconify icon="carbon:table-split" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="سجل شحن الطالب"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </Link>
        )}

        {/* purchase user record */}
        {roles.includes("user-payment-list") && (
          <Link
            to={`/dashboard/user-purchase-record/${user.id}`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem sx={{ color: "text.secondary" }}>
              <ListItemIcon>
                <Iconify icon="carbon:table-split" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="سجل مشتريات الطالب"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </Link>
        )}
        {roles.includes("create-notification") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenMessage}
          >
            <ListItemIcon>
              <Iconify icon="bxs:message-add" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="إرسال رسالة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        <Dialog
          disableEscapeKeyDown
          open={openMessage}
          fullWidth
          onClose={handleCloseMessage}
        >
          <DialogTitle>إرسال رسالة إلى {user.name}</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  نوع الرسالة
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Type}
                  onChange={handleChangeType}
                  input={<OutlinedInput label="نوع الرسالة" />}
                >
                  <MenuItem value={"gift"}>هدية</MenuItem>
                  <MenuItem value={"news"}>خبر</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label="نص الرسالة"
                  variant="outlined"
                  multiline
                  rows={5}
                  onChange={handleChangeMessage}
                  value={Message}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseMessage}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitMessage}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

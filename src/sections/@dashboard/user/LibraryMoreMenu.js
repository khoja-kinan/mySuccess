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
  InputLabel,
  Select,
  OutlinedInput,
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
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  ActivateUserUrl,
  ChargePointsUrl,
  CreatelibraryUrl,
  DisableUserUrl,
  DiscountPointsUrl,
} from "../../../constants/urls";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function LibraryMoreMenu({
  user,
  token,
  setLoadingBtn,
  loadingBtn,
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
    setLoadingBtn(true);
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${DisableUserUrl}${user.user.id}`, data, {
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
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ActivateUserUrl}${user.user.id}`, data, {
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
    setLoadingBtn(true);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .delete(`${CreatelibraryUrl}/${user.id}`, {
        headers,
      })
      .then((response) => {
        setOpenDeleteUser(false);
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
        setOpenDeleteUser(false);
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
    setLoadingBtn(true);
    const data = {
      points: UserBalance,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ChargePointsUrl}${user.user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenEditBalance(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBtn(false);
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
    setLoadingBtn(true);
    const data = {
      points: DiscountBalance,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${DiscountPointsUrl}${user.user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenDiscountBalance(false);
        setIsOpen(false);
        setLoadingBtn(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBtn(false);
        setIsOpen(false);
        setOpenDiscountBalance(false);
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
  const [Username, setUsername] = useState(user.user.name);
  const [libraryName, setLibraryName] = useState(user.library_name);
  const [Phone, setPhone] = useState(user.phone_number);
  const [City, setCity] = useState(user.city);
  const [Address, setAddress] = useState(user.address);
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeLibraryName = (event) => {
    setLibraryName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
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

  const handleSubmitEditUser = () => {
    setLoadingBtn(true);
    const formData = new FormData();
    Username !== user.user.name && formData.append("name", Username);
    libraryName !== user.library_name &&
      formData.append("library_name", libraryName);
    Phone !== user.phone_number && formData.append("phone_number", Phone);
    City !== user.city && formData.append("city", City);
    Address !== user.address && formData.append("address", Address.toString());
    password !== "" && formData.append("password", password);
    password !== "" && formData.append("password_confirmation", password);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CreatelibraryUrl}/${user.id}?_method=PUT`, formData, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenEditUser(false);
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
        setOpenEditUser(false);
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
        {user.can_login === 1 && roles.includes("library-disable") && (
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
          <DialogTitle>تعطيل حساب المكتبة</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من تعطيل حساب هذا المكتبة ؟
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
        {user.can_login === 0 && roles.includes("library-enable") && (
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
          <DialogTitle>تفعيل حساب المكتبة</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من تفعيل حساب هذا المكتبة ؟
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

        {/* Delete user */}
        {roles.includes("library-delete") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDeleteUser}
          >
            <ListItemIcon>
              <Iconify icon="ic:baseline-delete" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="حذف حساب المكتبة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDeleteUser}
          onClose={handleCloseDeleteUser}
        >
          <DialogTitle> حذف حساب المكتبة</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من حذف حساب هذه المكتبة ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDeleteUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingBtn}
              onClick={handleSubmitDeleteUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Edit user */}
        {roles.includes("library-edit") && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenEditUser}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-2-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="تعديل بيانات المكتبة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle>تعديل بيانات المكتبة</DialogTitle>
          <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
            <Box component="form">
              <FormControl>
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="اسم المستخدم"
                  variant="outlined"
                  onChange={handleChangeUsername}
                  value={Username}
                />
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="اسم المكتبة"
                  variant="outlined"
                  onChange={handleChangeLibraryName}
                  value={libraryName}
                />
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="رقم الهاتف"
                  variant="outlined"
                  type={"number"}
                  onChange={handleChangePhone}
                  value={Phone}
                />
                <TextField
                  id="outlined-basic"
                  label="كلمة السر"
                  variant="outlined"
                  onChange={handleChangePassword}
                  type="password"
                  value={password}
                  sx={{ m: 1, minWidth: 350 }}
                />
                <Box component="form">
                  <FormControl sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="demo-dialog-select-label">
                      المدينة
                    </InputLabel>
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

                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="العنوان"
                  variant="outlined"
                  onChange={handleChangeAddress}
                  value={Address}
                />
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button onClick={handleCloseEditUser}>
                    {t("description.Cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={loadingBtn}
                    onClick={handleSubmitEditUser}
                  >
                    {t("description.Ok")}
                  </LoadingButton>
                </DialogActions>
              </FormControl>
            </Box>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 350 }}></FormControl>
            </Box>
          </DialogContent>
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
              primary="شحن رصيد المكتبة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        <Dialog
          disableEscapeKeyDown
          open={openEditBalance}
          onClose={handleCloseEditBalance}
        >
          <DialogTitle>شحن رصيد المكتبة</DialogTitle>
          <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
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
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button onClick={handleCloseEditBalance}>
                    {t("description.Cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={loadingBtn}
                    onClick={handleSubmitEditBalance}
                  >
                    {t("description.Ok")}
                  </LoadingButton>
                </DialogActions>
              </FormControl>
            </Box>
          </DialogContent>
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
              primary="خصم رصيد المكتبة"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDiscountBalance}
          onClose={handleCloseDiscountBalance}
        >
          <DialogTitle>خصم رصيد المكتبة</DialogTitle>
          <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
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
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button onClick={handleCloseDiscountBalance}>
                    {t("description.Cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={loadingBtn}
                    onClick={handleSubmitDiscountBalance}
                  >
                    {t("description.Ok")}
                  </LoadingButton>
                </DialogActions>
              </FormControl>
            </Box>
          </DialogContent>
        </Dialog>

        {/* library charge record */}
        {roles.includes("library-charge-list") && (
          <Link
            to={`/dashboard/library-charge-record/${user.user.id}`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem sx={{ color: "text.secondary" }}>
              <ListItemIcon>
                <Iconify icon="carbon:table-split" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="سجل الشحن"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </Link>
        )}

        {/* library purchase record */}
        {roles.includes("role-list") && (
          <Link
            to={`/dashboard/library-purchase-record/${user.user.id}`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem sx={{ color: "text.secondary" }}>
              <ListItemIcon>
                <Iconify icon="carbon:table-split" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="سجل الشراء"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </Link>
        )}
      </Menu>
    </>
  );
}

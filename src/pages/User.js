import { filter } from "lodash";
import axios from "axios";
import {
  ActivateUsersURL,
  DeactivateUsersURL,
  EditDefaultPoints,
  notificationURL,
  storageUrl,
  userCreateUrl,
  userListUrl,
} from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Box,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  LinearProgress,
  Avatar,
} from "@mui/material";

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu1,
} from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import GetUsers from "../controller/GetUsers"; */
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function User() {
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openNewUser, setOpenNewUser] = useState(false);
  const [loadingUserBtn, setLoadingUserBtn] = useState(false);
  const [Username, setUsername] = useState();
  const [Phone, setPhone] = useState();
  const [Age, setAge] = useState();
  const [City, setCity] = useState();
  const [Class, setClass] = useState();
  const [canBuy, setCanBuy] = useState();
  const [password, setPassword] = useState();
  const [previewUserImage, setPreviewUserImage] = useState(null);
  const [UserImageToUpload, setUserImageToUpload] = useState(null);

  const [openMessage, setOpenMessage] = useState(false);
  const [openDeactivateAllUsersDialog, setOpenDeactivateAllUsersDialog] =
    useState(false);
  const [openActivateAllUsersDialog, setOpenActivateAllUsersDialog] =
    useState(false);
  const [Message, setMessage] = useState("");
  const [Type, setType] = useState("");

  const [USERLIST, setUSERLIST] = useState();

  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");
  async function fecthData() {
    if (token === null) {
      navigate("/");
    } else {
      await axios
        .get(`${userListUrl}all/student`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUSERLIST(response.data.data);
            setDefaultBalance(response.data.data.points);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  useEffect(() => {
    fecthData();
  }, [loadingUserBtn]);

  const [defaultBalance, setDefaultBalance] = useState("");
  const [defaultBalanceEdit, setDefaultBalanceEdit] = useState(true);

  if (USERLIST === undefined) {
    return <LinearProgress />;
  }
  let filteredUsers = applySortFilter(
    USERLIST.users,
    getComparator(order, orderBy),
    filterName
  );
  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم الطالب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "id",
      label: "معرف الطالب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "age",
      label: "العمر",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "phone_number",
      label: "رقم الهاتف",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "phone_number_verified",
      label: "حالة رقم الهاتف",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "city",
      label: "المدينة",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "class",
      label: "الصف",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "points",
      label: "رصيد النقاط",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "can_login",
      label: "حالة الحساب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "created_at",
      label: "تاريخ انشاء الحساب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    { id: "" },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.users.length)
      : 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) =>
          _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.id.toString().toLowerCase().indexOf(query.toLowerCase()) !==
            -1 ||
          _user.phone_number
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1 ||
          _user.class.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const isUserNotFound = filteredUsers.length === 0;

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

  const handleChangeDefaultBalance = (event) => {
    setDefaultBalance(event.target.value);
  };

  const handleChangeDefaultBalanceEdit = () => {
    setDefaultBalanceEdit(!defaultBalanceEdit);
  };

  const handleClickOpenNewUser = () => {
    setOpenNewUser(true);
  };

  const handleCloseNewUser = () => {
    setOpenNewUser(false);
  };

  const handleCaptureUserImage = (e) => {
    setUserImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitAddUser = () => {
    setLoadingUserBtn(true);
    const formData = new FormData();
    formData.append("name", Username);
    formData.append("phone_number", Phone);
    formData.append("password", password);
    formData.append("password_confirmation", password);
    formData.append("age", Age);
    formData.append("city", City);
    formData.append("class", Class);
    formData.append("can_buy", canBuy);
    UserImageToUpload !== null && formData.append("image", UserImageToUpload);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${userCreateUrl}`, formData, {
        headers,
      })
      .then((response) => {
        setLoadingUserBtn(false);
        setOpenNewUser(false);
        setUsername();
        setPhone();
        setAge();
        setCity();
        setClass();
        setCanBuy();
        setPassword();
        setPreviewUserImage(null);
        setUserImageToUpload(null);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setOpenNewUser(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  const handleSubmitDefaultBalanceChange = () => {
    setLoadingUserBtn(true);
    const data = {
      points: defaultBalance,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${EditDefaultPoints}`, data, {
        headers,
      })
      .then((response) => {
        setLoadingUserBtn(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setOpenNewUser(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* Message to All Users */

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

  const handleClickOpenDeactivateDialog = () => {
    setOpenDeactivateAllUsersDialog(true);
  };

  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateAllUsersDialog(false);
  };

  const handleSubmitMessage = () => {
    setLoadingUserBtn(true);
    const data = {
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
        setOpenMessage(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  const handleSubmitDeavtivateAllUsers = () => {
    setLoadingUserBtn(true);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .get(`${DeactivateUsersURL}`, {
        headers,
      })
      .then((response) => {
        setOpenDeactivateAllUsersDialog(false);
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
        setOpenDeactivateAllUsersDialog(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* Activate All */
  const handleClickOpenActivateDialog = () => {
    setOpenActivateAllUsersDialog(true);
  };

  const handleCloseActivateDialog = () => {
    setOpenActivateAllUsersDialog(false);
  };

  const handleSubmitAvtivateAllUsers = () => {
    setLoadingUserBtn(true);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .get(`${ActivateUsersURL}`, {
        headers,
      })
      .then((response) => {
        setOpenActivateAllUsersDialog(false);
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
        setOpenActivateAllUsersDialog(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Page title="لوحة التحكم | الطلاب">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            الطلاب
          </Typography>
          {roles.includes("user-create") && (
            <Button variant="contained" onClick={handleClickOpenNewUser}>
              إضافة طالب جديد
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>إضافة طالب جديد</DialogTitle>
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
                </Box>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitAddUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Card>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <UserListToolbar
              placeHolder="ابحث عن طالب..."
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
            {roles.includes("Get-default-points") && (
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <TextField
                  disabled={defaultBalanceEdit}
                  id="outlined-basic"
                  label="الرصيد الافتراضي"
                  variant="outlined"
                  onChange={handleChangeDefaultBalance}
                  value={defaultBalance}
                />
              </FormControl>
            )}
            {roles.includes("Edit-default-points") && defaultBalanceEdit ? (
              <Button onClick={handleChangeDefaultBalanceEdit}>
                تعديل القيمة الافتراضية
              </Button>
            ) : (
              roles.includes("Edit-default-points") && (
                <LoadingButton
                  loading={loadingUserBtn}
                  onClick={handleSubmitDefaultBalanceChange}
                >
                  حفظ
                </LoadingButton>
              )
            )}

            <Dialog
              disableEscapeKeyDown
              open={openMessage}
              fullWidth
              onClose={handleCloseMessage}
            >
              <DialogTitle>إرسال رسالة جماعية </DialogTitle>
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
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {roles.includes("create-notification") && (
              <Button
                variant="outlined"
                onClick={handleClickOpenMessage}
                sx={{ marginLeft: "1.5rem" }}
              >
                إرسال رسالة جماعية
              </Button>
            )}

            {roles.includes("Get-default-points") && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleClickOpenDeactivateDialog}
                sx={{ marginLeft: "1.5rem" }}
              >
                حذف جميع الحسابات
              </Button>
            )}
            {roles.includes("Get-default-points") && (
              <Button
                color="success"
                variant="outlined"
                onClick={handleClickOpenActivateDialog}
                sx={{ marginLeft: "1.5rem" }}
              >
                تأكيد أرقام جميع الحسابات
              </Button>
            )}
          </Box>
          <Dialog
            disableEscapeKeyDown
            open={openDeactivateAllUsersDialog}
            onClose={handleCloseDeactivateDialog}
          >
            <DialogTitle>حذف جميع الحسابات</DialogTitle>
            <DialogContent sx={{ width: "100%" }}>
              هل أنت متأكد من حذف جميع حسابات الطلاب ؟
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleCloseDeactivateDialog}>
                {t("description.Cancel")}
              </Button>
              <LoadingButton
                loading={loadingUserBtn}
                onClick={handleSubmitDeavtivateAllUsers}
              >
                {t("description.Ok")}
              </LoadingButton>
            </DialogActions>
          </Dialog>

          <Dialog
            disableEscapeKeyDown
            open={openActivateAllUsersDialog}
            onClose={handleCloseActivateDialog}
          >
            <DialogTitle> تأكيد أرقام جميع الحسابات</DialogTitle>
            <DialogContent sx={{ width: "100%" }}>
              هل أنت متأكد من تأكيد أرقام جميع حسابات الطلاب ؟
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleCloseActivateDialog}>
                {t("description.Cancel")}
              </Button>
              <LoadingButton
                loading={loadingUserBtn}
                onClick={handleSubmitAvtivateAllUsers}
              >
                {t("description.Ok")}
              </LoadingButton>
            </DialogActions>
          </Dialog>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={name}
                                src={`${storageUrl}${row.image}`}
                              />
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{
                                  margin:
                                    i18n.dir() === "rtl" &&
                                    "0 0.5rem !important",
                                }}
                              >
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {id}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.age}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.phone_number}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Label
                              variant="ghost"
                              sx={{
                                color:
                                  row.phone_number_verified === 0
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {row.phone_number_verified === 0
                                ? "غير مؤكد"
                                : "مؤكد"}
                            </Label>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.city}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.class}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.points}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Label
                              variant="ghost"
                              sx={{
                                color: row.can_login === 0 ? "red" : "green",
                              }}
                            >
                              {row.can_login === 0 ? "معلق" : "فعال"}
                            </Label>
                          </TableCell>
                          <TableCell align="right" padding="none">
                            {row.created_at.substring(
                              0,
                              row.created_at.indexOf("T")
                            )}
                          </TableCell>

                          {roles.includes("user-show") && (
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                              padding="none"
                            >
                              <UserMoreMenu1
                                user={row}
                                token={token}
                                loadingUserBtn={loadingUserBtn}
                                setLoadingUserBtn={setLoadingUserBtn}
                                roles={roles}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            sx={{ direction: "ltr" }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={USERLIST.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("description.UsersPageLabelRowsPerPage")}
          />
        </Card>
      </Container>
    </Page>
  );
}

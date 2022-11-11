import { filter } from "lodash";
import axios from "axios";
import { adminListUrl, storageUrl, userCreateUrl } from "../constants/urls";

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
  LinearProgress,
  Avatar,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  AdminsMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
//

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

export default function Admins() {
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
  const [password, setPassword] = useState();
  const [Account_type, setAccount_type] = useState();
  const [City, setCity] = useState();
  const [previewUserImage, setPreviewUserImage] = useState(null);
  const [UserImageToUpload, setUserImageToUpload] = useState(null);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(adminListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setUSERLIST(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [loadingUserBtn]);
  if (USERLIST === undefined) {
    return <LinearProgress />;
  }

  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم المستخدم",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "phone_number",
      label: "رقم الهاتف",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "account_type",
      label: "نوع الحساب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "can_login",
      label: "حالة الحساب",
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
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const filteredUsers = applySortFilter(
    USERLIST.users,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeAccountType = (event) => {
    setAccount_type(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
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

  const handleSubmitEditUser = () => {
    setLoadingUserBtn(true);
    const formData = new FormData();
    formData.append("name", Username);
    formData.append("phone_number", Phone);
    formData.append("password", password);
    formData.append("password_confirmation", password);
    UserImageToUpload !== null && formData.append("image", UserImageToUpload);
    formData.append("role_name", Account_type);
    formData.append("city", City);

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
        setPassword();
        setAccount_type();
        setCity();
        setPreviewUserImage(null);
        setUserImageToUpload(null);

        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
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
  return (
    <Page title="لوحة التحكم | مدراء النظام">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            مدراء النظام
          </Typography>
          {roles.includes("role-create") && (
            <Button variant="contained" onClick={handleClickOpenNewUser}>
              إضافة مدير نظام جديد
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>إضافة مدير نظام جديد</DialogTitle>
          <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
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
                  label="رقم الهاتف"
                  variant="outlined"
                  type={"number"}
                  onChange={handleChangePhone}
                  value={Phone}
                />
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="كلمة السر"
                  variant="outlined"
                  onChange={handleChangePassword}
                  type="password"
                  value={password}
                />
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
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
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="demo-dialog-select-label">
                      نوع الحساب
                    </InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={Account_type}
                      onChange={handleChangeAccountType}
                      input={<OutlinedInput label="نوع الحساب" />}
                    >
                      <MenuItem value={"Admin"}>مدير نظام</MenuItem>
                      <MenuItem value={"SuperVisor"}>مشرف نظام</MenuItem>
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
                </Box>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button onClick={handleCloseNewUser}>
                    {t("description.Cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={loadingUserBtn}
                    onClick={handleSubmitEditUser}
                  >
                    {t("description.Ok")}
                  </LoadingButton>
                </DialogActions>
              </FormControl>
            </Box>
          </DialogContent>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder="ابحث عن مدير نظام..."
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

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
                          <TableCell component="th" scope="row" padding="none">
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
                            {row.phone_number}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Label
                              variant="ghost"
                              sx={{
                                color:
                                  row.role_name === "Admin" ? "green" : "grey",
                              }}
                            >
                              {row.role_name}
                            </Label>
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
                          {roles.includes("role-edit") && (
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                            >
                              <AdminsMoreMenu
                                user={row}
                                token={token}
                                loadingUserBtn={loadingUserBtn}
                                setLoadingUserBtn={setLoadingUserBtn}
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

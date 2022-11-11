import { filter } from "lodash";
import axios from "axios";
import { CreatelibraryUrl, libraryListUrl } from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import useStateRef from "react-usestateref";

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
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@mui/material";

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  LibraryMoreMenu,
  UserListHead,
  UserListToolbar,
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

export default function Libraries() {
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openNewUser, setOpenNewUser] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [Username, setUsername] = useState();
  const [Phone, setPhone] = useState();
  const [City, setCity] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmaton, setPasswordConfirmation, passwordConfirmatonRef] =
    useStateRef();
  const [Address, setAddress] = useState();
  const [libraryName, setLibraryName] = useState();
  const [passwordError, setPasswordError] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(`${libraryListUrl}`, {
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
  }, [loadingBtn]);
  if (USERLIST === undefined) {
    return <LinearProgress />;
  }

  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم المكتبة",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "phone_number",
      label: "رقم الهاتف",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "city",
      label: "المدينة",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "address",
      label: "العنوان",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "can_login",
      label: "حالة الحساب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "points",
      label: "رصيد المكتبة",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "transfer_balance",
      label: "قيمة التحويل الكلية",
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
      const newSelecteds = USERLIST.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

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
          _user.library_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

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

  const handleChangePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value);
    password !== passwordConfirmatonRef.current && setPasswordError(true);
    password === passwordConfirmatonRef.current && setPasswordError(false);
  };

  const handleClickOpenNewUser = () => {
    setOpenNewUser(true);
  };

  const handleCloseNewUser = () => {
    setOpenNewUser(false);
  };

  const handleSubmitAddUser = () => {
    setLoadingBtn(true);
    const data = {
      name: Username,
      library_name: libraryName,
      phone_number: Phone,
      city: City,
      address: Address,
      password: password,
      password_confirmation: passwordConfirmaton,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(CreatelibraryUrl, data, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenNewUser(false);

        setUsername();
        setPhone();
        setCity();
        setPassword();
        setPasswordConfirmation();
        setAddress();
        setLibraryName();
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
        setOpenNewUser(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Page title="لوحة التحكم | المكتبات">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            المكتبات
          </Typography>
          {roles.includes("library-create") && (
            <Button variant="contained" onClick={handleClickOpenNewUser}>
              إضافة مكتبة جديد
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>إضافة مكتبة جديد</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="اسم المستخدم"
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
                  label="اسم المكتبة"
                  variant="outlined"
                  onChange={handleChangeLibraryName}
                  value={libraryName}
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
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="تأكيد كلمة السر"
                  variant="outlined"
                  onChange={handleChangePasswordConfirmation}
                  type="password"
                  value={passwordConfirmaton}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? "كلمة السر غير متطابقة مع تأكيد كلمة السر"
                      : ""
                  }
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
                <TextField
                  id="outlined-basic"
                  label="العنوان"
                  variant="outlined"
                  onChange={handleChangeAddress}
                  value={Address}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton loading={loadingBtn} onClick={handleSubmitAddUser}>
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder="ابحث عن مكتبة..."
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
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.name) !== -1;
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.library_name}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.phone_number}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.city}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.address}
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
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.points}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.amount}
                          </TableCell>
                          {roles.includes("library-show") && (
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                            >
                              <LibraryMoreMenu
                                roles={roles}
                                user={row}
                                token={token}
                                setLoadingBtn={setLoadingBtn}
                                loadingBtn={loadingBtn}
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
            count={USERLIST.length}
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

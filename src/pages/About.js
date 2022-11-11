import axios from "axios";
import { aboutURL, supportURL } from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  DialogActions,
  Box,
} from "@mui/material";

// components

import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import SupportViderMoreMenu from "../sections/@dashboard/user/courses/SupportViderMoreMenu";
import AboutTeacherMoreMenu from "../sections/@dashboard/user/courses/AboutTeacherMoreMenu";
//------------------------------------------------------------------

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

export default function About() {
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewUnit, setOpenNewUnit] = useState(false);
  const [TeacherName, setTeacherName] = useState("");
  const [TeacherCourse, setTeacherCourse] = useState("");
  const [TeacherFacebook, setTeacherFacebook] = useState("");
  const [TeacherWhatsapp, setTeacherWhatsapp] = useState("");
  const [TeacherTelegram, setTeacherTelegram] = useState("");

  const [openAbout, setOpenAbout] = useState(false);
  const [About, setAbout] = useState("");

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  function fecthData() {
    axios
      .get(`${aboutURL}`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUSERLIST(response.data.data);
          setAbout(response.data.data.text[0].about_text);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    if (token === null) {
      navigate("/");
    } else {
      fecthData();
    }
  }, [loadingBtn]);

  if (USERLIST === undefined) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "teacher_name",
      label: "اسم المدرس",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "teacher_course",
      label: "الاختصاص",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "teacher_facebook",
      label: "حساب فيس بوك",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "teacher_whatsapp",
      label: "حساب واتس اب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "teacher_telegram",
      label: "حساب تيليغرام",
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

  const isUserNotFound = USERLIST.length === 0;

  const handleClickOpenNewUnit = () => {
    setOpenNewUnit(true);
  };

  const handleCloseNewUnit = () => {
    setOpenNewUnit(false);
  };

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

  const handleSubmitAddUnit = () => {
    setLoadingBtn(true);
    const data = {
      teacher_name: TeacherName,
      teacher_course: TeacherCourse,
      teacher_facebook: TeacherFacebook,
      teacher_whatsapp: TeacherWhatsapp,
      teacher_telegram: TeacherTelegram,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${aboutURL}`, data, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenNewUnit(false);

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
        setOpenNewUnit(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* About */
  const handleChangeAbout = (event) => {
    setAbout(event.target.value);
  };

  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };

  const handleCloseAbout = () => {
    setOpenAbout(false);
  };

  const handleSubmitEditAbout = () => {
    setLoadingBtn(true);
    const data = {
      about_text: About,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${aboutURL}/text`, data, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenAbout(false);

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
        setOpenAbout(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Page title="لوحة التحكم | حول التطبيق">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            حول التطبيق
          </Typography>
          {roles.includes("about-add") && (
            <Button variant="contained" onClick={handleClickOpenNewUnit}>
              إضافة استاذ جديد
            </Button>
          )}
          <Dialog
            disableEscapeKeyDown
            open={openNewUnit}
            onClose={handleCloseNewUnit}
          >
            <DialogTitle>إضافة استاذ جديد</DialogTitle>
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
              <Button onClick={handleCloseNewUnit}>
                {t("description.Cancel")}
              </Button>
              <LoadingButton loading={loadingBtn} onClick={handleSubmitAddUnit}>
                {t("description.Ok")}
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Stack>
        <h3 style={{ margin: "0.3rem 0" }}>أساتذة التطبيق</h3>
        <Card>
          <UserListToolbar
            placeHolder="ابحث هنا..."
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
                  {USERLIST.teachers
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
                            {row.teacher_name}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.teacher_course}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                            sx={{ direction: "ltr" }}
                          >
                            {row.teacher_facebook}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                            sx={{ direction: "ltr" }}
                          >
                            {row.teacher_whatsapp}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                            sx={{ direction: "ltr" }}
                          >
                            {row.teacher_telegram}
                          </TableCell>
                          {roles.includes("about-add") && (
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                            >
                              <AboutTeacherMoreMenu
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
            count={USERLIST.teachers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("description.UsersPageLabelRowsPerPage")}
          />
        </Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "2rem 0 0.5rem 0",
          }}
        >
          <h3>نص حول التطبيق</h3>
          <Button variant="outlined" onClick={handleClickOpenAbout}>
            تعديل
          </Button>
          <Dialog
            disableEscapeKeyDown
            open={openAbout}
            fullWidth
            onClose={handleCloseAbout}
          >
            <DialogTitle>تعديل نص حول التطبيق</DialogTitle>
            <DialogContent sx={{ width: "100%" }}>
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
                    label="حول التطبيق"
                    variant="outlined"
                    multiline
                    rows={5}
                    onChange={handleChangeAbout}
                    defaultValue={USERLIST.text[0].about_text}
                    value={About}
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleCloseAbout}>
                {t("description.Cancel")}
              </Button>
              <LoadingButton
                loading={loadingBtn}
                onClick={handleSubmitEditAbout}
              >
                {t("description.Ok")}
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Box>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableBody>
                  <TableRow hover tabIndex={-1}>
                    <TableCell align={i18n.dir() === "ltr" ? "left" : "right"}>
                      {USERLIST.text[0].about_text}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

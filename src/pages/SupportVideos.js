import axios from "axios";
import { supportURL } from "../constants/urls";

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

export default function SupportVideos() {
  const { unitId } = useParams();
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewUnit, setOpenNewUnit] = useState(false);
  const [VideoName, setVideoName] = useState("");
  const [VideoTeacher, setVideoTeacher] = useState("");
  const [VideoBio, setVideoBio] = useState("");
  const [VideoTime, setVideoTime] = useState("");
  const [VideoLink, setVideoLink] = useState("");

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  function fecthData() {
    axios
      .get(`${supportURL}`, {
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
      id: "name",
      label: "اسم الفيديو",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "teacher_name",
      label: "اسم المدرس",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "bio",
      label: "ملخص",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "time",
      label: "وقت الفيديو",
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

  const handleChangeVideoName = (e) => {
    setVideoName(e.target.value);
  };

  const handleChangeVideoTeacher = (e) => {
    setVideoTeacher(e.target.value);
  };

  const handleChangeVideoBio = (e) => {
    setVideoBio(e.target.value);
  };

  const handleChangeVideoTime = (e) => {
    setVideoTime(e.target.value);
  };

  const handleChangeVideoLink = (e) => {
    setVideoLink(e.target.value);
  };

  const handleSubmitAddUnit = () => {
    setLoadingBtn(true);
    const data = {
      tittle: VideoName,
      teacher_name: VideoTeacher,
      bio: VideoBio,
      link: VideoLink,
      time: VideoTime,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${supportURL}`, data, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenNewUnit(false);
        setVideoName("");
        setVideoTeacher("");
        setVideoBio("");
        setVideoTime("");
        setVideoLink("");
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
  return (
    <Page title="لوحة التحكم | الدعم النفسي">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            فيديوهات الدعم النفسي
          </Typography>
          {roles.includes("support-create") && (
            <Button variant="contained" onClick={handleClickOpenNewUnit}>
              إضافة جديد
            </Button>
          )}
          <Dialog
            disableEscapeKeyDown
            open={openNewUnit}
            onClose={handleCloseNewUnit}
          >
            <DialogTitle>إضافة فيديو جديد</DialogTitle>
            <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
              <Box component="form">
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="اسم الفيديو"
                    variant="outlined"
                    onChange={handleChangeVideoName}
                    value={VideoName}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="اسم المدرس"
                    variant="outlined"
                    onChange={handleChangeVideoTeacher}
                    value={VideoTeacher}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="الملخص"
                    variant="outlined"
                    type={"text"}
                    onChange={handleChangeVideoBio}
                    value={VideoBio}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="وقت الفيديو"
                    variant="outlined"
                    type={"text"}
                    onChange={handleChangeVideoTime}
                    value={VideoTime}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="رابط الفيديو"
                    variant="outlined"
                    type={"text"}
                    onChange={handleChangeVideoLink}
                    value={VideoLink}
                  />
                  <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleCloseNewUnit}>
                      {t("description.Cancel")}
                    </Button>
                    <LoadingButton
                      type="submit"
                      loading={loadingBtn}
                      onClick={handleSubmitAddUnit}
                    >
                      {t("description.Ok")}
                    </LoadingButton>
                  </DialogActions>
                </FormControl>
              </Box>
            </DialogContent>
          </Dialog>
        </Stack>

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
                  {USERLIST.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row) => {
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
                          {row.tittle}
                        </TableCell>

                        <TableCell
                          align={i18n.dir() === "ltr" ? "left" : "right"}
                        >
                          {row.teacher_name}
                        </TableCell>
                        <TableCell
                          align={i18n.dir() === "ltr" ? "left" : "right"}
                        >
                          {row.bio}
                        </TableCell>
                        <TableCell
                          align={i18n.dir() === "ltr" ? "left" : "right"}
                        >
                          {row.time}
                        </TableCell>
                        {roles.includes("support-update") && (
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <SupportViderMoreMenu
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

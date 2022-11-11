import { filter } from "lodash";
import axios from "axios";
import { CourseFoldersURL, CourseVideoUnitsURL } from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
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
import Iconify from "../components/Iconify";
import CourseMaerialsMoreMenu from "../sections/@dashboard/user/courses/CourseMaerialsMoreMenu";
import CourseFoldersMoreMenu from "../sections/@dashboard/user/courses/CourseFoldersMoreMenu";
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
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function CourseFolders() {
  const { courseId } = useParams();
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const [Foldername, setFoldername] = useState("");
  const [Price, setPrice] = useState("");

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(`${CourseFoldersURL}${courseId}`, {
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
      label: "اسم المجلد",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "price",
      label: "السعر",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "count",
      label: "عدد الوحدات",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "show_units",
      label: "عرض الوحدات",
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
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
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

  const handleClickOpenNewFolder = () => {
    setOpenNewFolder(true);
  };

  const handleCloseNewFolder = () => {
    setOpenNewFolder(false);
  };

  const handleChangeFoldername = (e) => {
    setFoldername(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmitAddFolder = () => {
    setLoadingBtn(true);
    const data = {
      name: Foldername,
      price: Price,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CourseFoldersURL}${courseId}`, data, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenNewFolder(false);
        setFoldername("");
        setPrice("");

        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              //window.location.reload();
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBtn(false);
        setOpenNewFolder(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Page title="لوحة التحكم | المجلدات">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            المجلدات
          </Typography>
          {roles.includes("video-unit-create") && (
            <Button variant="contained" onClick={handleClickOpenNewFolder}>
              إضافة جديد
            </Button>
          )}
          <Dialog
            disableEscapeKeyDown
            open={openNewFolder}
            onClose={handleCloseNewFolder}
          >
            <DialogTitle>إضافة مجلد جديد</DialogTitle>
            <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
              <Box component="form">
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="اسم المجلد"
                    variant="outlined"
                    onChange={handleChangeFoldername}
                    value={Foldername}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="السعر"
                    variant="outlined"
                    type={"number"}
                    onChange={handleChangePrice}
                    value={Price}
                  />
                  <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleCloseNewFolder}>
                      {t("description.Cancel")}
                    </Button>
                    <LoadingButton
                      type="submit"
                      loading={loadingBtn}
                      onClick={handleSubmitAddFolder}
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
            placeHolder="ابحث عن مجلد..."
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
                            {row.folder_name}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.price}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.unit_number}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              to={`/dashboard/folder/${row.id}/material-units`}
                            >
                              <Iconify
                                icon="bi:eye-fill"
                                width={20}
                                height={20}
                              />
                            </Link>
                          </TableCell>
                          {roles.includes("video-unit-edit") && (
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                            >
                              <CourseFoldersMoreMenu
                                user={row}
                                token={token}
                                setLoadingBtn={setLoadingBtn}
                                loadingBtn={loadingBtn}
                                courseId={courseId}
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

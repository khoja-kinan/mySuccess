import { filter } from "lodash";
import axios from "axios";
import { AddMaterialURL, materialURL, storageUrl } from "../constants/urls";

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
  Link,
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
import UnitMaterialMoreMenu from "../sections/@dashboard/user/courses/UnitMaterialMoreMenu";

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

export default function UnitMaterials() {
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
  const [FileName, setFileName] = useState("");
  const [FilePages, setFilePages] = useState("");
  const [File, setFile] = useState("");

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  function fecthData() {
    axios
      .get(`${materialURL}${unitId}`, {
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
  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم الملف",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "pages",
      label: "عدد الصفحات",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "show_file",
      label: "مشاهدة الملف",
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

  const isUserNotFound = filteredUsers.length === 0;

  const handleClickOpenNewUnit = () => {
    setOpenNewUnit(true);
  };

  const handleCloseNewUnit = () => {
    setOpenNewUnit(false);
  };

  const handleChangesetFileName = (e) => {
    setFileName(e.target.value);
  };
  const handleChangeFilePages = (e) => {
    setFilePages(e.target.value);
  };
  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmitAddUnit = () => {
    setLoadingBtn(true);
    const formData = new FormData();
    formData.append("name", FileName);
    formData.append("material_unit_id", unitId);
    formData.append("file", File);
    formData.append("pages", FilePages);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${AddMaterialURL}`, formData, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setOpenNewUnit(false);
        setFileName("");
        setFilePages("");
        setFile("");
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
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
    <Page title="لوحة التحكم | ملفات الوحدة">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            ملفات الوحدة
          </Typography>
          {roles.includes("video-unit-create") && (
            <Button variant="contained" onClick={handleClickOpenNewUnit}>
              إضافة جديد
            </Button>
          )}
          <Dialog
            disableEscapeKeyDown
            open={openNewUnit}
            onClose={handleCloseNewUnit}
          >
            <DialogTitle>إضافة ملف جديد</DialogTitle>
            <DialogContent sx={{ width: "100%", paddingBottom: "0" }}>
              <Box component="form">
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    label="اسم الملف"
                    variant="outlined"
                    onChange={handleChangesetFileName}
                    value={FileName}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    id="outlined-basic"
                    type={"number"}
                    label="عدد الصفحات"
                    variant="outlined"
                    onChange={handleChangeFilePages}
                    value={FilePages}
                  />
                  <Box component="form" sx={{ m: 1, minWidth: 350 }}>
                    <label for="file-upload" style={{ margin: "0.5rem 0" }}>
                      ملف الوحدة
                    </label>
                    <br />
                    <input
                      id="file-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleUploadFile}
                    />
                  </Box>
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
                            {row.name}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.pages}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              href={`${storageUrl}${row.path}`}
                              target="_blank"
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
                              <UnitMaterialMoreMenu
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

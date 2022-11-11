import { filter } from "lodash";
import axios from "axios";
import {
  LibrarychargeRecord,
  LibrarySearchRecordByDate,
} from "../constants/urls";

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
  FormControl,
  TextField,
  Box,
} from "@mui/material";

import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";

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

export default function LibraryChargeRecord() {
  const { user_id } = useParams();
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  const [LibraryPoints, setLibraryPoints] = useState();
  const [LibraryChargePointsByDate, setLibraryChargePointsByDate] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");
  function fecthData() {
    if (token === null) {
      navigate("/");
    } else {
      axios
        .get(`${LibrarychargeRecord}${user_id}`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setUSERLIST(response.data.data);
          setLibraryPoints(response.data.library_points);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  useEffect(() => {
    fecthData();
  }, [navigate]);

  if (USERLIST === undefined) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "created_at",
      label: "تاريخ الشحن",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "amount",
      label: "النقاط",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "userId",
      label: "معرف الطالب",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
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
          _user.points.toString().toLowerCase().indexOf(query.toLowerCase()) !==
            -1 ||
          _user.user.toString().toLowerCase().indexOf(query.toLowerCase()) !==
            -1
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

  const handleChangeFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleChangeToDate = (e) => {
    setToDate(e.target.value);
  };
  const handleSearch = () => {
    setSearchLoading(true);
    axios
      .get(`${LibrarySearchRecordByDate}${user_id}/${FromDate}/${ToDate}`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setSearchLoading(false);
        setUSERLIST(response.data.data);
        setLibraryChargePointsByDate(response.data.amount_points);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <Page title="لوحة التحكم | سجل تحويل المكتبة">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            سجل تحويل المكتبة
          </Typography>
        </Stack>
        <Typography sx={{ margin: "0.5rem 0" }}>
          رصيد النقاط الحالي : {LibraryPoints}
        </Typography>
        {LibraryChargePointsByDate && (
          <Typography sx={{ margin: "0.5rem 0" }}>
            مجموع التحويل الكلي خلال المدة المحددة: {LibraryChargePointsByDate}
          </Typography>
        )}
        <Card>
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <UserListToolbar
              placeHolder="ابحث هنا ..."
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <TextField
                id="outlined-basic"
                label="من"
                variant="outlined"
                onChange={handleChangeFromDate}
                value={FromDate}
                placeholder="yyyy-mm-dd"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <TextField
                id="outlined-basic"
                label="إلى"
                placeholder="yyyy-mm-dd"
                variant="outlined"
                onChange={handleChangeToDate}
                value={ToDate}
              />
            </FormControl>
            <LoadingButton loading={searchLoading} onClick={handleSearch}>
              بحث
            </LoadingButton>
          </Box>
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
                      const isItemSelected =
                        selected.indexOf(row.created_at) !== -1;
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="right">
                            {row.created_at.substring(
                              0,
                              row.created_at.indexOf("T")
                            )}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.points}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.user}
                          </TableCell>
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

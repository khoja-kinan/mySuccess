import { filter } from "lodash";
import axios from "axios";
import {
  purchaseRecord,
  PurchaseSearchByDate,
  SearchByDate,
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

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
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

export default function UserPurchaseRecord() {
  const { user_id } = useParams();
  const { t, i18n } = useTranslation();
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
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");
  function fecthData() {
    if (token === null) {
      navigate("/");
    } else {
      axios
        .get(`${purchaseRecord}${user_id}`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setUSERLIST(response.data.data);
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
      id: "course_name",
      label: "اسم الدرس",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "unit_name",
      label: "اسم الوحدة",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "kind",
      label: "النوع",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "points",
      label: "السعر",
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "created_at",
      label: "تاريخ الشراء",
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
          _user.course_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.kind.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.points.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.unit_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.created_at.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
      .get(`${PurchaseSearchByDate}${user_id}/${FromDate}/${ToDate}`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setSearchLoading(false);
        setUSERLIST(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <Page title="لوحة التحكم | سجل شراء طالب">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            سجل شراء طالب
          </Typography>
        </Stack>

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
                    .map((item) =>
                      item.map((row, index) => {
                        const isItemSelected =
                          selected.indexOf(row.course_name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={index}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <TableCell
                                align={i18n.dir() === "ltr" ? "left" : "right"}
                              >
                                {row.course_name}
                              </TableCell>
                            </TableCell>

                            <TableCell
                              align={i18n.dir() === "ltr" ? "left" : "right"}
                            >
                              {row.unit_name}
                            </TableCell>
                            <TableCell
                              align={i18n.dir() === "ltr" ? "left" : "right"}
                            >
                              <Label variant="ghost">
                                {row.kind === "video" ? "فيديو" : "ملف"}
                              </Label>
                            </TableCell>
                            <TableCell
                              align={i18n.dir() === "ltr" ? "left" : "right"}
                            >
                              {row.points}
                            </TableCell>
                            <TableCell align="right" padding="none">
                              {row.created_at}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
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

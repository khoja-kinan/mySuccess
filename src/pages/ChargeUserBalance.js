import axios from "axios";
import {
  ChargePointsUrl,
  pointsPricesList,
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
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  FormControl,
  Box,
  TextField,
  LinearProgress,
  TableHead,
} from "@mui/material";

// components

import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";

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

export default function ChargeUserBalance() {
  const [loadingUserBtn, setLoadingBalanceBtn] = useState(false);
  const [UserId, setUserId] = useState();
  const [BalanceToCharge, setBalanceToCharge] = useState();

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");
  function fecthData() {
    if (token === null) {
      navigate("/");
    } else {
      axios
        .get(`${pointsPricesList}`, {
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
  useEffect(() => {
    fecthData();
  }, [navigate]);

  if (USERLIST === undefined) {
    return <LinearProgress />;
  }
  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };
  const handleChangeBalanceToCharge = (event) => {
    setBalanceToCharge(event.target.value);
  };

  const handleSubmitChargeBalance = () => {
    setLoadingBalanceBtn(true);
    const data = {
      points: BalanceToCharge,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ChargePointsUrl}${UserId}`, data, {
        headers,
      })
      .then((response) => {
        setLoadingBalanceBtn(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBalanceBtn(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Page title="لوحة التحكم | شحن رصيد طالب">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            شحن رصيد طالب
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">رقم معرف الطالب</TableCell>
                    <TableCell align="right">
                      عدد النقاط المراد شحنها للطالب
                    </TableCell>
                    <TableCell align="right" padding="none">
                      {" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Box component="form">
                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                          <TextField
                            id="outlined-basic"
                            placeholder="ادخل رقم معرف الطالب"
                            variant="outlined"
                            type={"number"}
                            onChange={handleChangeUserId}
                            value={UserId}
                          />
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box component="form">
                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                          <TextField
                            id="outlined-basic"
                            placeholder="ادخل عدد النقاط"
                            variant="outlined"
                            type={"number"}
                            onChange={handleChangeBalanceToCharge}
                            value={BalanceToCharge}
                          />
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <LoadingButton
                        loading={loadingUserBtn}
                        sx={{ fontSize: "1.5rem" }}
                        variant="outlined"
                        onClick={handleSubmitChargeBalance}
                      >
                        شحن
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>
                      <TableCell align="right">سعر النقاط</TableCell>
                      <TableCell align="right">
                        {BalanceToCharge * USERLIST.student_price} ل.س
                      </TableCell>
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead>
                      <TableCell align="right">نسبة المكتبة</TableCell>
                      <TableCell align="right">
                        {BalanceToCharge *
                          USERLIST.student_price *
                          USERLIST.library_price}{" "}
                        ل.س
                      </TableCell>
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead>
                      <TableCell align="right">نسبة البرنامج</TableCell>
                      <TableCell align="right">
                        {BalanceToCharge * USERLIST.student_price -
                          BalanceToCharge *
                            USERLIST.student_price *
                            USERLIST.library_price}{" "}
                        ل.س
                      </TableCell>
                    </TableHead>
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

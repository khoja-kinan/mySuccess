import axios from "axios";
import { TermsOfServiceURL } from "../constants/urls";

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
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
//------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TermsOfService() {
  const { t, i18n } = useTranslation();

  const [openAbout, setOpenAbout] = useState(false);
  const [About, setAbout] = useState("");

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [USERLIST, setUSERLIST] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("NToken");

  function fecthData() {
    axios
      .get(`${TermsOfServiceURL}`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUSERLIST(response.data.data[0].TermsOfUseText);
          setAbout(response.data.data[0].TermsOfUseText);
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
      TermsOfUseText: About,
    };

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${TermsOfServiceURL}?_method=PUT`, data, {
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
    <Page title="لوحة التحكم |  سياسة الخصوصية">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            سياسة الخصوصية
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "2rem 0 0.5rem 0",
          }}
        >
          <Button variant="outlined" onClick={handleClickOpenAbout}>
            تعديل
          </Button>
          <Dialog
            disableEscapeKeyDown
            open={openAbout}
            fullWidth
            onClose={handleCloseAbout}
          >
            <DialogTitle>تعديل نص سياسة الخصوصية </DialogTitle>
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
                    label=" سياسة الخصوصية"
                    variant="outlined"
                    multiline
                    rows={5}
                    onChange={handleChangeAbout}
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
                      {USERLIST}
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

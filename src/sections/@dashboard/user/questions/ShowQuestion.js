import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  IconButton,
  Typography,
  DialogActions,
  TextField,
} from "@mui/material";
// component
import Iconify from "../../../../components/Iconify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { QuestionsURL } from "../../../../constants/urls";
import Swal from "sweetalert2";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
// ----------------------------------------------------------------------

export default function ShowQuestion({
  user,
  token,
  loadingBtn,
  setLoadingBtn,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [Attachments, setAttachments] = useState(null);
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const handleUploadFiles = (e) => {
    setAttachments(e.target.files);
  };
  const handleSubmitAnswer = () => {
    setLoadingBtn(true);
    const formData = new FormData();
    formData.append("answer_text", answer);

    if (Attachments !== null) {
      for (let i = 0; i < Attachments.length; i++) {
        formData.append(`files[]`, Attachments[i]);
      }
    }

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-type": "multipart/form-data",
    };
    axios
      .post(`${QuestionsURL}/answer/${user.id}`, formData, {
        headers,
      })
      .then((response) => {
        setLoadingBtn(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
            }
          }
        );
      })
      .catch((error) => {
        setLoadingBtn(false);
        setIsOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="bi:eye-fill" width={20} height={20} />
      </IconButton>

      <Dialog
        disableEscapeKeyDown
        open={isOpen}
        fullScreen
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>نص السؤال</DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
          }}
        >
          <Typography sx={{ marginBottom: "1rem" }}>
            {user.question_text}
          </Typography>
          <hr />
          <DialogTitle>الإجابة عن السؤال</DialogTitle>
          <TextField
            fullWidth
            id="fullWidth"
            multiline
            rows={6}
            value={answer}
            onChange={handleChangeAnswer}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ margin: "1rem 0" }}
          >
            إضافة مرفقات{" "}
            <input type="file" hidden multiple onChange={handleUploadFiles} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>
            {t("description.Cancel")}
          </Button>{" "}
          <LoadingButton loading={loadingBtn} onClick={handleSubmitAnswer}>
            {" "}
            تأكيد الإجابة{" "}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

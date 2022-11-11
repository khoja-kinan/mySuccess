import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
// component
import Iconify from "../../../../components/Iconify";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CourseFoldersURL } from "../../../../constants/urls";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function CourseFoldersMoreMenu({
  user,
  token,
  setLoadingBtn,
  loadingBtn,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  /* 
      Edit unit
  */
  const [openEditUnit, setOpenEditUnit] = useState(false);
  const [Unitname, setUnitname] = useState(user.folder_name);
  const [Price, setPrice] = useState(user.price);
  const handleChangeUnitname = (e) => {
    setUnitname(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleClickOpenEditUnit = () => {
    setOpenEditUnit(true);
  };

  const handleCloseEditUnit = () => {
    setOpenEditUnit(false);
  };

  const handleSubmitEditUnit = () => {
    setLoadingBtn(true);

    const formData = new FormData();
    Unitname !== user.folder_name && formData.append("name", Unitname);
    Price !== user.price && formData.append("price", Price);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${CourseFoldersURL}${user.id}?_method=PUT`, formData, {
        headers,
      })
      .then((response) => {
        setOpenEditUnit(false);
        setIsOpen(false);
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
        setOpenEditUnit(false);
        setIsOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  /* 
      Delete unit
  */
  const [openDeleteUnit, setOpenDeleteUnit] = useState(false);

  const handleClickOpenDeleteUnit = () => {
    setOpenDeleteUnit(true);
  };

  const handleCloseDeleteUnit = () => {
    setOpenDeleteUnit(false);
  };

  const handleSubmitDeleteUnit = () => {
    setLoadingBtn(true);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .delete(`${CourseFoldersURL}${user.id}`, {
        headers,
      })
      .then((response) => {
        setOpenDeleteUnit(false);
        setIsOpen(false);
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

        setIsOpen(false);
        setOpenDeleteUnit(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Edit Unit  */}

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenEditUnit}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-2-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="تعديل المجلد"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openEditUnit}
          onClose={handleCloseEditUnit}
        >
          <DialogTitle>تعديل المجلد</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="اسم المجلد"
                  variant="outlined"
                  onChange={handleChangeUnitname}
                  value={Unitname}
                />
              </FormControl>
            </Box>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-basic"
                  label="السعر"
                  variant="outlined"
                  type={"text"}
                  onChange={handleChangePrice}
                  value={Price}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditUnit}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton loading={loadingBtn} onClick={handleSubmitEditUnit}>
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Delete unit */}

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDeleteUnit}
        >
          <ListItemIcon>
            <Iconify icon="ic:baseline-delete" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="حذف المجلد"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openDeleteUnit}
          onClose={handleCloseDeleteUnit}
        >
          <DialogTitle>حذف المجلد</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            هل أنت متأكد من حذف هذا المجلد ؟
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDeleteUnit}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingBtn}
              onClick={handleSubmitDeleteUnit}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

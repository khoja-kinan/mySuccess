import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Avatar,
  Typography,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  ActivateUserUrl,
  DisableUserUrl,
  storageUrl,
  userCrudeUrl,
} from "../../../constants/urls";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function TeachersMoreMenu({
  user,
  token,
  setLoadingUserBtn,
  loadingUserBtn,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  /* 
      Disable User 
  */
  const [openDisableUser, setOpenDisableUser] = useState(false);

  const handleClickOpenDisableUser = () => {
    setOpenDisableUser(true);
  };

  const handleCloseDisableUser = () => {
    setOpenDisableUser(false);
  };

  const handleSubmitDisableUser = () => {
    setLoadingUserBtn(true);
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${DisableUserUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenDisableUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /*  window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setOpenDisableUser(false);
        setIsOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  /* 
      Activate User 
  */
  const [openActivateUser, setOpenActivateUser] = useState(false);

  const handleClickOpenActivateUser = () => {
    setOpenActivateUser(true);
  };

  const handleCloseActivateUser = () => {
    setOpenActivateUser(false);
  };

  const handleSubmitActivateUser = () => {
    setLoadingUserBtn(true);
    const data = {};
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${ActivateUserUrl}${user.id}`, data, {
        headers,
      })
      .then((response) => {
        setOpenActivateUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);

        setIsOpen(false);
        setOpenActivateUser(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  /* 
     Delete user
  */
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const handleClickOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };

  const handleSubmitDeleteUser = () => {
    setLoadingUserBtn(true);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .delete(`${userCrudeUrl}${user.id}`, {
        headers,
      })
      .then((response) => {
        setLoadingUserBtn(false);

        setOpenDeleteUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* 
     Update User
  */

  const [openEditUser, setOpenEditUser] = useState(false);
  const [Username, setUsername] = useState(user.name);
  const [Phone, setPhone] = useState(user.phone_number);
  const [UserImageToShow, setUserImageToShow] = useState(user.image);
  const [previewUserImage, setPreviewUserImage] = useState(null);
  const [UserImageToUpload, setUserImageToUpload] = useState(null);
  const [City, setCity] = useState(user.city);
  const [password, setPassword] = useState();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };

  const handleCaptureUserImage = (e) => {
    setUserImageToShow(null);
    setUserImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitEditUser = () => {
    setLoadingUserBtn(true);
    const formData = new FormData();
    Username !== user.name && formData.append("name", Username);
    Phone !== user.phone_number && formData.append("phone_number", Phone);
    City !== user.city && formData.append("city", City);
    password && formData.append("password", password);
    password && formData.append("password_confirmation", password);
    UserImageToUpload !== null && formData.append("image", UserImageToUpload);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(`${userCrudeUrl}${user.id}?_method=PUT`, formData, {
        headers,
      })
      .then((response) => {
        setLoadingUserBtn(false);
        setOpenEditUser(false);
        setIsOpen(false);
        Swal.fire({ text: response.data.message, icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              /* window.location.reload(); */
              setLoadingUserBtn(false);
            }
          }
        );
      })
      .catch((error) => {
        setLoadingUserBtn(false);
        setIsOpen(false);
        setOpenEditUser(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
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
        {/* Disable User */}
        {user.can_login === 1 && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDisableUser}
          >
            <ListItemIcon>
              <Iconify
                icon="fluent:person-delete-24-filled"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="?????????? ????????????"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDisableUser}
          onClose={handleCloseDisableUser}
        >
          <DialogTitle>?????????? ???????? ????????????????</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            ???? ?????? ?????????? ???? ?????????? ???????? ?????? ???????????????? ??
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDisableUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitDisableUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Activate User */}
        {user.can_login === 0 && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenActivateUser}
          >
            <ListItemIcon>
              <Iconify
                icon="fluent:person-add-20-filled"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="?????????? ????????????"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openActivateUser}
          onClose={handleCloseActivateUser}
        >
          <DialogTitle>?????????? ???????? ????????????</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            ???? ?????? ?????????? ???? ?????????? ???????? ?????? ???????????? ??
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseActivateUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitActivateUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Delete user */}
        {user.role_name !== "Admin" && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDeleteUser}
          >
            <ListItemIcon>
              <Iconify icon="ic:baseline-delete" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="?????? ????????????"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        <Dialog
          disableEscapeKeyDown
          open={openDeleteUser}
          onClose={handleCloseDeleteUser}
        >
          <DialogTitle> ?????? ???????? ????????????????</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            ???? ?????? ?????????? ???? ?????? ???????? ?????? ???????????????? ??
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseDeleteUser}>
              {t("description.Cancel")}
            </Button>
            <LoadingButton
              loading={loadingUserBtn}
              onClick={handleSubmitDeleteUser}
            >
              {t("description.Ok")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Edit user */}
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenEditUser}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-2-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="?????????? ???????????? ????????????????"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle>?????????? ???????????? ????????????????</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box component="form">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="?????? ????????????????"
                  variant="outlined"
                  onChange={handleChangeUsername}
                  value={Username}
                />
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="?????? ????????????"
                  variant="outlined"
                  type={"number"}
                  onChange={handleChangePhone}
                  value={Phone}
                />
                <TextField
                  sx={{ m: 1, minWidth: 350 }}
                  id="outlined-basic"
                  label="???????? ????????"
                  variant="outlined"
                  onChange={handleChangePassword}
                  type="password"
                  value={password}
                />
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="demo-dialog-select-label">
                      ??????????????
                    </InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={City}
                      onChange={handleChangeCity}
                      input={<OutlinedInput label="??????????????" />}
                    >
                      <MenuItem value={"??????????"}>??????????</MenuItem>
                      <MenuItem value={"????????????????"}>????????????????</MenuItem>
                      <MenuItem value={"????????"}>????????</MenuItem>
                      <MenuItem value={"?????? ????????"}>?????? ????????</MenuItem>
                      <MenuItem value={"??????"}>??????</MenuItem>
                      <MenuItem value={"??????"}>??????</MenuItem>
                      <MenuItem value={"????????"}>????????</MenuItem>
                      <MenuItem value={"????????"}>????????</MenuItem>
                      <MenuItem value={"????????????????"}>????????????????</MenuItem>
                      <MenuItem value={"????????"}>????????</MenuItem>
                      <MenuItem value={"????????????????"}>????????????????</MenuItem>
                      <MenuItem value={"?????? ??????????"}>?????? ??????????</MenuItem>
                      <MenuItem value={"????????????"}>????????????</MenuItem>
                      <MenuItem value={"??????????"}>??????????</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    width: "90%",
                    marginTop: "1rem",
                  }}
                >
                  <Typography>???????? ????????????????</Typography>
                  <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                    <Box className="upload__image-wrapper">
                      {previewUserImage ? (
                        <Box className="image-item">
                          <Avatar
                            src={`${previewUserImage}`}
                            alt=""
                            sx={{ width: 200, height: 200, margin: "0 auto" }}
                          />
                          <Box className="image-item__btn-wrapper">
                            <Button
                              sx={{ margin: "1rem 0" }}
                              variant="outlined"
                              onClick={() => setPreviewUserImage(null)}
                            >
                              ??????
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          component="label"
                        >
                          ???????? ???????? ????????????????
                          <input
                            type="file"
                            accept="image/png"
                            hidden
                            onChange={handleCaptureUserImage}
                          />
                        </Button>
                      )}
                      {UserImageToShow && (
                        <Box className="image-item" sx={{ margin: "1rem 0" }}>
                          <Avatar
                            src={`${storageUrl}${UserImageToShow}`}
                            alt=""
                            sx={{ width: 200, height: 200, margin: "0 auto" }}
                          />
                          <Box className="image-item__btn-wrapper">
                            <Button
                              sx={{ margin: "1rem 0" }}
                              variant="outlined"
                              onClick={() => setUserImageToShow(null)}
                            >
                              ??????
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </FormControl>
                </Box>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button onClick={handleCloseEditUser}>
                    {t("description.Cancel")}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={loadingUserBtn}
                    onClick={handleSubmitEditUser}
                  >
                    {t("description.Ok")}
                  </LoadingButton>
                </DialogActions>
              </FormControl>
            </Box>
          </DialogContent>
        </Dialog>
      </Menu>
    </>
  );
}

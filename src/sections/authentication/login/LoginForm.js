import * as Yup from "yup";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
// login function
import { login } from "../../../controller/AuthController";
//
import useAuth from "../../../hooks/useAuth";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const loginUser = async () => {
    const result = await login(formik.values.username, formik.values.password);
    if (result.status === 200) {
      const username = result.data.data.user.name;
      const roles = result.data.data.permissions;
      setAuth({ username, roles });
      localStorage.setItem("Nusername", result.data.data.user.name);
      localStorage.setItem("Nrole_name", result.data.data.user.role_name);
      localStorage.setItem("NuserD", result.data.data.user.id);
      localStorage.setItem(
        "Nroles",
        JSON.stringify(result.data.data.permissions)
      );

      localStorage.setItem("NToken", result.data.data.authorization.token);

      result.data.data.user.role_name === "Admin"
        ? navigate("/dashboard/app", { replace: true })
        : result.data.data.user.role_name === "SuperVisor"
        ? navigate("/dashboard/user", { replace: true })
        : result.data.data.user.role_name === "library"
        ? navigate(
            `/dashboard/library-charge-record/${result.data.data.user.id}`,
            { replace: true }
          )
        : navigate(`/dashboard/questions`, { replace: true });
    } else {
      setError(result);
      setShowError(true);
      formik.setSubmitting(false);
    }
  };
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("يرجى ادخال كلمة المرور"),
    username: Yup.string().required("يرجى ادخال رقم الهاتف"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginUser();
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ outlineColor: "#8364e7" }}>
          {showError ? (
            <div
              style={{
                color: "red",
                border: "1px solid red",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          ) : (
            ""
          )}
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="رقم الهاتف"
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            sx={{
              direction: "ltr",
            }}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="كلمة المرور"
            sx={{
              direction: "ltr",
            }}
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{
            backgroundColor: "#8364e7",
          }}
        >
          تسجيل الدخول
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

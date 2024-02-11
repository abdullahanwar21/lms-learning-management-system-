import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Box,
  OutlinedInput,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import "./Login.css";
import React, { useRef, useState } from "react";
import { loginUser } from "../../Config/Firebase/firebasemethods";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser({
      email: email.current.value,
      password: password.current.value,
    })
      .then((res) => {
        setLoading(false);
        if (res.userType === "student") {
          navigate("/student");
        } else {
          navigate("/admin");
        }
      })
      .catch((errors) => {
        setError(errors.message);
        setLoading(false);
      });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="logInForm">
      <div class="container">
        <div class="row">
          <div class="offset-md-4 col-md-4 offset-md-4 formBody">
            <h1 class="my-5 text-light mx-1" align="center">
              Log<span>in</span>
            </h1>
            {error && (
              <Alert variant="filled" severity="error" className="my-4">
                {error}
              </Alert>
            )}
            <form onSubmit={handleForm}>
              <div class="mb-3">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  inputRef={email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                  }}
                />
              </div>
              <div class="mb-3">
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000",
                      "&.Mui-focused": {
                        color: "#000",
                      },
                    },
                  }}
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ color: "#000" }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth
                    inputRef={password}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              <button
                type="submit"
                class="btn  text-light mb-3 col-md-12 signUpBtn"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </button>
              <span class="my-4 mx-2 text-decoration-none ml-2">
                Don't Have An Account ?{" "}
                {
                  <a
                    onClick={() => navigate("/")}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "blue",
                    }}
                  >
                    Log in
                  </a>
                }
              </span>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;

import React, { useEffect } from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Base64 } from "js-base64";
import axios from "axios";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import getLoginStatus from "../controllers/getLoginStatus";

const Login = (prop) => {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [ISP, setISP] = React.useState("");
  const [remember, setremember] = React.useState(true);
  const [showPassword, setshowPassword] = React.useState(false);

  const handleusernameChange = (event) => {
    setusername(event.target.value);
    localStorage.setItem("username", event.target.value);
  };
  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
    localStorage.setItem("password", remember ? event.target.value : "");
  };
  const handleISPChange = (event) => {
    setISP(event.target.value);
    localStorage.setItem("domain", event.target.value);
  };
  const handlerememberChange = (event) => {
    setremember(event.target.checked);
    localStorage.setItem("remember", event.target.checked);
    localStorage.setItem("password", event.target.checked ? password : "");
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setshowPassword(!showPassword);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", remember ? password : "");
    localStorage.setItem("domain", ISP);
    localStorage.setItem("remember", remember);
    const msgtoserver = [
      `username=${username}`,
      `password=${Base64.encode(password)}`,
      `domain=${ISP}`,
      `enablemacauth=0`,
    ];
    try {
      await axios.post(
        "http://10.255.255.14/index.php/index/login",
        msgtoserver.join("&")
      );
      getLoginStatus()
        .then((stat) => {
          prop.setstatus(stat.data);
        })
        .catch((err) => console.error(`错误${err}`));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.length !== 0) {
      setusername(localStorage.getItem("username"));
      setpassword(localStorage.getItem("password"));
      setISP(localStorage.getItem("domain"));
      setremember(localStorage.getItem("remember") === "false" ? false : true);
    }
  }, []);

  return (
    <Grid container spacing={1} style={{ marginTop: 5 }}>
      <Grid item lg={3} xs={12}>
        <TextField
          id="input-with-icon-textfield"
          label="用户名"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          value={username}
          onChange={handleusernameChange}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item lg={3} xs={12}>
        <TextField
          id="input-with-icon-textfield"
          label="密码"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlepasswordChange}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item>
        <FormControl variant="outlined" style={{ minWidth: "120px" }}>
          <InputLabel id="demo-simple-select-outlined-label">运营商</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={ISP}
            onChange={handleISPChange}
            label="运营商"
          >
            <MenuItem value="">未选择</MenuItem>
            <MenuItem value="CMCC">中国移动</MenuItem>
            <MenuItem value="ChinaNet">中国电信</MenuItem>
            <MenuItem value="Unicom">中国联通</MenuItem>
            <MenuItem value="NUIST">南信大土著</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item style={{ display: "flex" }}>
        <FormControlLabel
          control={
            <Switch
              name="rempwd"
              checked={remember}
              onChange={handlerememberChange}
              color="primary"
            />
          }
          label="记住密码"
          style={{ alignSelf: "center", height: 56 }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          style={{ height: 56 }}
          onClick={handleClick}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;

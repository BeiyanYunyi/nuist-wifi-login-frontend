import axios from "axios"
import {Typography,Container,Button} from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import getLoginStatus from "../controllers/getLoginStatus";

const InfoPanel = (prop) => {
    const handleClick = (event) => {
      event.preventDefault();
      axios
        .post("http://10.255.255.14/index.php/index/logout", "")
        .then(() => {
          getLoginStatus()
            .then((stat) => {
              prop.setstatus(stat.data);
            })
            .catch((err) => console.error(`错误${err}`));
        })
        .catch((err) => console.error(err));
    };

    if (prop.status.status === 1) {
      return (
        <>
          <Typography gutterBottom>
            运营商&emsp;：{prop.status.logout_domain}
          </Typography>
          <Typography gutterBottom>IP地址&emsp;：{prop.status.logout_ip}</Typography>
          <Typography gutterBottom>登录地点：{prop.status.logout_location}</Typography>
          <Typography gutterBottom>
            账&emsp;&emsp;号：{prop.status.logout_username}
          </Typography>
          <Container style={{ width: "100%", textAlign: "center" ,maxWidth:"100%" ,position:"relative",bottom:-60 }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ height: 52, width: "100%" }}
              onClick={handleClick}
            >
              <ExitToAppIcon />
            </Button>
          </Container>
        </>
      );
    }
    return "";
  };
  export default InfoPanel
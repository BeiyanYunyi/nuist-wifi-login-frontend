import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Button, Typography } from "@material-ui/core";
import getLoginStatus from "../controllers/getLoginStatus";

const StatusTab = (prop) => {
  const handleClick = (event) => {
    event.preventDefault();
    getLoginStatus()
      .then((stat) => {
        prop.setstatus(stat.data);
      })
      .catch((err) => console.error(`错误${err}`));
  };

  if (prop.status.info === "connecting") {
    return (
      <>
        <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
          请检查无线网络连接状态
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ height: 52, width: "100%" }}
          onClick={handleClick}
        >
          <AutorenewIcon />
          刷新
        </Button>
      </>
    );
  }

  return (
    <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
      {prop.status.info}
    </Typography>
  );
};

export default StatusTab;

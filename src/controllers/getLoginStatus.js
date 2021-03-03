import axios from "axios";
const getLoginStatus = async () => {
  const status = await axios.get("http://10.255.255.14/index.php/index/init");
  return status;
};
export default getLoginStatus;

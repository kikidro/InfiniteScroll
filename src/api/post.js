import axios from "axios";
const request = async (limit, skip) => {
  // generate a number of posts

  const { data } = await axios.get(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  console.log("request:::", data.users);
  return data.users;
};
export default request;

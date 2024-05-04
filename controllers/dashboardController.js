import { query } from "../queries.js";

const getDashboard = async (req, res) => {
  try {
    const user = req.user.id;
    console.log(user);
    const userInfo = await query(
      "SELECT instagram, firstname, lastname, admin FROM users WHERE id = ?",
      [user],
    );

    console.log(userInfo, "userInfo");

    res.status(200).json({ userInfo });
  } catch (error) {}
};

export { getDashboard };

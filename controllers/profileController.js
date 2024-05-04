import { query } from "../queries.js";

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileInfo = await query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    console.log(profileInfo, "profileInfo");

    res.status(200).json({ profileInfo });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

export { getProfile };

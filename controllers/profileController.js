export async function getProfile(req, res) {
  const user = { ...req.user };
  delete user.hash;
  return res.json(user);
}
export async function updateProfile(req, res) {}

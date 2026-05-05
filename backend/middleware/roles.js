// this file checks if the user has the right role
// example: admin, membre

const checkRole = (role) => {
  return (req, res, next) => {

    // if user role does not match → block
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. ${role}s only.` })
    }

    // if role matches then continue
    next()
  }
}

export default checkRole
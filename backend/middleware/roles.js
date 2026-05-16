// this file checks if the user has the right role
// example: admin, membre

const checkRole = (...roles) => {
  return (req, res, next) => {

    // if user role is not in the allowed roles list → block
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied. Required roles: ${roles.join(' or ')}.` })
    }

    // if role matches then continue
    next()
  }
}

export default checkRole
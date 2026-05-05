// this file checks if the user is logged in
// if token is valid then continue
// if not then block the request

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req, res, next) => {

  // get the token from the header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // if no token then block
  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' })
  }

  // if token exists then verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // save user info for next steps
    next() // continue to the route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

export default verifyToken
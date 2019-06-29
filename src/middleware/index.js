require('dotenv').config()

const API_KEY = process.env.API_KEY || ''

export const validateRequest = (req, res, next) => {
  if (req.body.key === API_KEY)
    next()
  else {
    console.log(req.body.key, API_KEY)
    res.status(403).send({ status: 'unauthorized' })
  }
}

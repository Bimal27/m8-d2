import createHttpError from 'http-errors'
import atob from 'atob'
import blogpostModel from '../services/schema.js'

export const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        'Please provide credentials in Authorization header',
      ),
    )
  } else {
    const decodedCredentials = atob(req.headers.authorization.split(' ')[1])
    console.log(decodedCredentials)

    const [email, password] = decodedCredentials.split(':')
    console.log('EMAIL ', email)
    console.log('PASSWORD ', password)

    const author = await blogpostModel.checkCredentials(email, password)
    if (author) {
      req.author = author
      next()
    } else {
      next(createHttpError(401, 'Credentials are not correct!'))
    }
  }
}

const User = require('./models/user')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username })
        if (!user) return done(null, false)
        const match = await bcrypt.compare(password, user.password)
        return done(null, match ? user : false)
      } catch (err) {
        return done(err)
      }
    })
  )

  passport.serializeUser((user, cb) => cb(null, user.id))

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id)
      // Only expose safe fields to the rest of the app (never the password hash)
      cb(null, user ? { id: user.id, username: user.username } : false)
    } catch (err) {
      cb(err)
    }
  })
}

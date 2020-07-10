const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const HASH_ROUNDS = 10

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    leetracerId: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: 'Invalid email.'
      }
    },
    twitter: String,
    github: String,
    bio: String,
    dateJoined: {
      type: Date,
      default: Date.now
    },
    numberOfRaces: Number,
    avgRaceSpeed: Number,

  }
)

// hash password before saving user
userSchema.pre('save', (next) => {
  const user = this

  // only hash password if new/modified
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.hashSync(user.password, HASH_ROUNDS, (err, hash) => {
    if (err) {
      return next(err)
    }
    // overwrite plaintext password with hashed one
    user.password = hash
    next()
  })

})

userSchema.methods.isPasswordValid = (data) => {
  return bcrypt.compareSync(data, this.password)
}

const UserModel = mongoose.Model('User', userSchema)

module.exports = UserModel
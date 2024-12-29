const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() {
        return this.roles !== 'student';
      },
    },
    username: {
      type: String,
      sparse: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    middleName: String,
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    phoneNo: {
      type: String,
    },
    roles: {
      type: String,
      enum: ["admin", "teacher", "student"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {

  if (this.roles === "student") {
    this.email = undefined;
  }

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

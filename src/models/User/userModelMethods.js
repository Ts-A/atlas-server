module.exports = (userSchema) => {
  userSchema.methods.toJSON = (req, res, next) => {};
};

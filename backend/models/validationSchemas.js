const { Joi } = require('celebrate');

const validator = require('validator');

const validateImageUrl = (value, helpers) => {
  if (
    validator.isURL(value) &&
    (value.indexOf('.jpg') > -1 ||
      value.indexOf('.jpeg') > -1 ||
      value.indexOf('.gif') > -1 ||
      value.indexOf('.png') > -1)
  ) {
    return value;
  }

  return helpers.error('string.uri');
};

const loginValidator = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const signUpValidator = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const cardCreationValidator = {
  name: Joi.string().required(),
  link: Joi.string().required().custom(validateImageUrl),
};

const updateProfileValidator = {
  name: Joi.string().required(),
  about: Joi.string().required(),
};

const updateAvatarValidator = {
  avatar: Joi.string().required().custom(validateImageUrl),
};

module.exports = {
  loginValidator,
  signUpValidator,
  cardCreationValidator,
  updateProfileValidator,
  updateAvatarValidator,
};

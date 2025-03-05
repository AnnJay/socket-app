const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

const ERROR_MESSAGES = {
  MISSING_FIELDS: "Заполните все поля",
  PASSWORD_LENGTH: "Длина пароля - минимум 6 символов",
  USER_EXISTS: "Пользователь с таким email адресом уже существует",
  INVALID_CREDENTIALS: "Неверный email или пароль пользователя",
  SERVER_ERROR: "Internet Server Error",
  SIGNUP_ERROR: "Произошла ошибка при попытке регистрации пользователя",
  NO_TOKEN: "Пользователь не зарегестрирован или истек срок его сессии",
  INVALID_TOKEN: "Неверный токен",
  USER_NOT_FOUND: "Пользователь не найден",
}

const SUCCESS_MESSAGES = {
  USER_CREATED: "Пользователь успешно создан",
  LOGIN_SUCCESS: "Вход выполнен успешно",
  LOGOUT_SUCCESS: "Пользователь вышел из аккаунта",
}

module.exports = { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES }

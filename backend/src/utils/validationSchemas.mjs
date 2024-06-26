export const userValidation = {
  username: {
    exists: {
      errorMessage: "Request has to include username"
    },
    isString: {
      errorMessage: "Username must be a string"
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 32
      },
      errorMessage:
        "Username cannot be empty, more than 32 characters or only whitespaces"
    }
  },
  password: {
    exists: {
      errorMessage: "Request has to include password"
    },
    isString: {
      errorMessage: "Password must be a string"
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 32
      },
      errorMessage:
        "Password cannot be empty, more than 32 characters or only whitespaces"
    }
  }
}
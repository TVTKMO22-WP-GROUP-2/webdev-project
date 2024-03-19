import { User } from "../database/schemas/user.mjs";

export const createUserValidation = {
  username: {
    exists: {
      errorMessage: "Request has to include username"
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 32,
      },
      errorMessage:
        "Username cannot empty or more than 32 characters long",
    },
    custom: {
      options: async (value) => {
        const existingUser = await User.findOne({ username: value });
        if (existingUser) {
          return Promise.reject("Username already taken");
        } else return true;
      },
    },
  },
  password: {
    exists: {
      errorMessage: "Request has to include password"
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 32,
      },
      errorMessage:
        "Password cannot empty or more than 32 characters long",
    },
  },
};

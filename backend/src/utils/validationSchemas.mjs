export const createUserValidation = {
    username: {
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        },
        isLength: {
            options: {
                min: 1,
                max: 32
            },
            errorMessage: "Username cannot be less than 1 character or more than 32 characters long"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isString: {
            errorMessage: "Password must be a string"
        },
        isLength: {
            options: {
                min: 1,
                max: 32
            },
            errorMessage: "Password cannot be less than 1 character or more than 32 characters long"
        }
    }
};
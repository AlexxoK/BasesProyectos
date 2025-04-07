export const validateUsername = (username) => {
    const regex = /^\S{3,8}$/;
    return regex.test(username);
}

export const validateUsernameMessage = 'El nombre de usuario debe tener entre 5 a 8 caracteres y no debe llevar espacios!';
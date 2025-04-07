export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export const emailValidationMessage = 'Ingresa una dirección de correo válido!';
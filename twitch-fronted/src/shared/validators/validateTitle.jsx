export const validateTitle = (title) => {
    return title.length >= 3 && title.length <= 30;
}

export const validateTitleMessage = 'El título debe llevas entre 10 a 30 caracteres!';
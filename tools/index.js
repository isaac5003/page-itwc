function inputValidation(required = true, min = null, max = null, type = null) {
    const rules = [];
    if (type == "email") {
        rules.push({
            type: type,
            required,
            message: "Ingresa una direccion de correo valida.",
            trigger: ["blur", "change"],
        });
    } else {
        rules.push({
            type: type,
            required,
            message: "Este campo es requerido.",
            trigger: "blur",
        });
    }
    if (min != null) {
        if (max != null) {
            rules.push({
                type: type,
                min,
                max,
                message: `Minimo ${min} y maximo ${max} caracteres`,
                trigger: "blur",
            });
        } else {
            rules.push({
                type: type,
                min,
                message: `Minimo ${min} caracteres`,
                trigger: "blur",
            });
        }
    } else {
        rules.push({
            type: type,
            max,
            message: `Maximo ${max} caracteres`,
            trigger: "blur",
        });
    }
    return rules;
}

function selectValidation(required = true) {
    return [
        {
            required,
            message: "Este campo es requerido.",
            trigger: "change",
        },
    ];
}

module.exports = {
    inputValidation,
    selectValidation
};


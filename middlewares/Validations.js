const { NewStudentSchema, NewGradeSchema, NewUserSchema, loginSchema } = require("../models/schemas/ValidationSchemas");

module.exports.validateNewUserInput = (req, res, next) => {
    const {error} = NewUserSchema.validate(req.body);

    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({error: msg});
    }
    return next();
};

module.exports.validateNewGradeInput = (req, res, next) => {
    console.log('validateNewGradeInput');
    const {error} = NewGradeSchema.validate(req.body);

    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({error: msg});
    }
    return next();
};

module.exports.validateNewStudentInput = (req, res, next) => {
    const {error} = NewStudentSchema.validate(req.body);

    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({error: msg});
    }
    return next();
}

module.exports.validateLoginInput = (req, res, next) =>{
    const {error} = loginSchema.validate(req.body);

    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({error: msg});
    }
    return next();
};


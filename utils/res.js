const notification = require('../models/notification');
const { errorHandler } = require('./error');
async function response(req, res, next) {
    try {

        const { res_object, model_name } = req;
        console.log(model_name)
        const { message, notify, result, results } = res_object;
        if (notify)
            await notification.create({
                data: message,
                type: model_name
            })
        return res.status(200).json({ message: message, success: true, result: result, results: results });
    }
    catch (err) {
        next(err)
    }
}

module.exports = { response }
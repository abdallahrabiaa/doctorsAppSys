async function get(req, res, next) {
    try {
        const { Model, query } = req;
        const { q, page, populate, field, value } = query;
        const limit = 10;
        const defaultPage = page || 1;
        const filterObject = {

            name: { $regex: q || "", $options: 'i' }
        };
        if (field)
            filterObject[field] = value;
        const results = await Model.find(filterObject).skip(limit * defaultPage - limit).limit(limit).populate(populate).exec();
        const total = await Model.countDocuments(filterObject);
        const res_object = { message: "successfuly retrive data", success: true, results: results, total, notify: false };
        req.res_object = res_object;
        next()
    }
    catch (error) {
        next(error);

    }
}
async function getOne(req, res, next) {
    try {
        const { Model, query, params } = req;
        const { populate } = query;
        const { ID } = params;
        const result = await Model.findById(ID).populate(populate).exec();

        req.res_object = { message: "successfuly retrive data", success: true, result: result, notify: false };
        next()

    }
    catch (error) {
        next(error);
    }
}
async function create(req, res, next) {
    try {
        const { Model, query, body } = req;
        if (!Object.values(body).length) throw new Error(`Invalid body: ${JSON.stringify(body)}`)
        const result = await Model.create(body)

        req.res_object = { message: `successfuly create ${result.name || result._id} `, success: true, result: result, notify: true };
        next()

    }
    catch (error) {
        next(error);

    }
}
async function edit(req, res, next) {
    try {
        const { Model, query, body, params } = req;
        const { ID } = params;
        const { populate } = query;
        if (!Object.values(body).length) throw new Error(`Invalid body: ${JSON.stringify(body)}`)
        const result = await Model.findByIdAndUpdate(ID, body).exec();

        req.res_object = { message: `successfuly create ${result.name} `, success: true, result: result, notify: true };
        next()

    }
    catch (error) {
        next(error);

    }
}
async function remove(req, res, next) {
    try {
        const { Model, query, body, params } = req;
        const { ID } = params;
        const { populate } = query;
        const result = await Model.findByIdAndDelete(ID).populate(populate).exec();
        req.res_object = { message: `successfuly delete ${result && result.name} `, success: true, result: result, notify: true };
        next()

    }
    catch (error) {
        next(error);

    }
}



module.exports = { get, create, remove, getOne, edit }
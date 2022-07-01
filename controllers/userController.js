const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

class UserController {
    get = async (req, res) => {
        try {
            const { orderBy, order, page, rowsPerPage } = req.query;
            const data = await userService.getAll(orderBy, order, page, rowsPerPage);

            return res.json(data);
        } catch (e) {
            console.log(e);
            errorHandler(res, e);
        }
    };

    block = async (req, res) => {
        try {
            const { id } = req.body;
            const user = await userService.blockById(id);

            res.json(user);
        } catch (e) {
            console.log(e);
            errorHandler(res, e);
        }
    };

    unBlock = async (req, res) => {
        try {
            const { id } = req.body;
            const user = await userService.unBlockById(id);

            res.json(user);
        } catch (e) {
            console.log(e);
            errorHandler(res, e);
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.body;
            const user = await userService.deleteById(id);

            res.json(user);
        } catch (e) {
            console.log(e);
            errorHandler(res, e);
        }
    };
}

module.exports = new UserController();
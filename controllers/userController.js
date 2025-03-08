import { prepareSuccessResponse } from '../helpers/response.js';
import User from '../models/user.js';

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200).json(prepareSuccessResponse(users, "Users fetched successfully"));
    } catch (error) {
        console.log(error)
    }

}
export default {
    getAllUsers
}

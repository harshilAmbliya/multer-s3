import { prepareSuccessResponse } from "../helpers/response.js";
import Profile from "../models/profile.js";

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const profile = await Profile.find({ user: userId })

        return res.status(200).json(prepareSuccessResponse(profile, "Profile fetched successfully"));
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, phone, address } = req.body;
        const image = req.file ? `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${req.file.key}` : undefined;

        const updateData = { name, email, phone, address };
        if (image) updateData.image = image;
        const profile = await Profile.findOneAndUpdate({ user: userId }, updateData, { new: true });

        return res.status(200).json(prepareSuccessResponse(profile, "Profile updated successfully"));
    } catch (error) {
        console.log(error)
    }
}

export default { getProfile, updateProfile };
// imports
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'

// login user controller
const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        return { accessToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating token");
    }
};

const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User not found/Incorrect Email")
    }
    
    const isValidPassword = await user.isPasswordCorrect(password)

    if (!isValidPassword) {
        throw new ApiError(400, "Password is Incorrect")
    }

    const { accessToken } = await generateToken(user._id)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                accessToken
            }, "Admin logged in successfully")
        );
})

export { loginAdmin }

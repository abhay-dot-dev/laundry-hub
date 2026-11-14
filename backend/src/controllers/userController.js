import User from '../models/User.js'

export const userProfile = async (req, res) => {
    const id = req.user.userId;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({
            message: "User profile fetched successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
}
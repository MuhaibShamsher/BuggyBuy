import User from '../models/user.model.js'

const userRegister = async (req, res) => {
  const { name, email, password, confirmPassword, isAdmin } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const newUser = new User({
      name,
      email,
      password,
      isAdmin
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}

const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const user = await User.findOne(req.body);
    // const user = await User.findOne({ email: { $ne: null }, password: { $ne: null } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: false,
      secure: false,
      sameSite: 'none'
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: 'Login successful.',
        userId: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: false,
      secure: false,
      sameSite: 'none'
    }

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: 'Logout successful.' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found!' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

export {
  userRegister,
  userLogin,
  logoutUser,
  deleteUser,
  getAllUsers
}
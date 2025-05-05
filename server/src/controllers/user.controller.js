import User from '../models/user.model.js'
import crypto from 'crypto'

const userRegister = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const hashPassword = crypto.createHash('md5').update(password).digest('hex');

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
      password: hashPassword
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== hashedPassword) {
      return res.status(404).json({ message: 'Incorrect password' });
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
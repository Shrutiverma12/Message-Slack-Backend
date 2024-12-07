import User from '../schema/user.js';
import crudRepository from './crudReository.js';

const userRepository = {
  ...crudRepository(User),
  getByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },
  getByUserName: async function ({ username }) {
    const user = await User.findOne({ username }).select('-password');
    return user;
  },
  getByUserId: async function (id) {
    const user = await User.findOne({ _id: id });
    return user;
  },
  updatePassword: async function (user, password) {
    const newPassword = await User.findByIdAndUpdate(user, { password });
    return newPassword;
  }
};

export default userRepository;

import Role from "../models/Role"
import User from "../models/User"

import bcrypt from "bcryptjs"

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount()
    // check for existing roles
    if (count == 0) {
      // Create default Roles
      const values = await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
        new Role({ name: "visit" }).save(),
      ]);
      console.log(values);
    }

    // create Admin
    const user = await User.findOne({ name: process.env.NAME })
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator", "user"] } });

    if (!user) {
      // create a new admin user
      await User.create({
        name: process.env.NAME,
        lastname: process.env.LASTNAME,
        empresa: process.env.EMPRESA,
        valid: true,
        email: process.env.EMAIL,
        password: await bcrypt.hash(process.env.PASSWORD, 10),
        roles: roles.map((role) => role._id),
      });
      console.log('Admin User Created!')
    }

    
  } catch (error) {
    console.error(error);
  }
}
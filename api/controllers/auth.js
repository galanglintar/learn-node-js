const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
    });
    const result = await user.save();

    const createUser = await createHasuraUser(
      user.email,
      user.name,
      user.password,
      ""
    );
    if (createUser.success === true) {
      await updateHasuraId(user.email, createUser.id);
    }

    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    if (user.hasuraUserId === "") {
      const createUser = await createHasuraUser(
        user.email,
        user.name,
        user.password,
        user.status
      );
      if (createUser.success === true) {
        await updateHasuraId(user.email, createUser.id);
      }
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const createHasuraUser = async (email, name, password, status) => {
  const action = require("../hasura/hasura-action");
  const query = require("../hasura/queries/create-user");
  const graphqlQuery = {
    query: query(email, name, password, status),
  };
  try {
    const data = await action(graphqlQuery);
    const errors = data["errors"];

    console.log(data);
    if (errors !== undefined) {
      return {
        success: false,
        message: data["errors"][0]["message"],
      };
    } else {
      return {
        success: true,
        id: data.data["insert_users_one"]["_id"],
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Internal error",
    };
  }
};

const updateHasuraId = async (email, hasuraUserId) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      // error handling here, but skip for now
      return false;
    }
    user.hasuraUserId = hasuraUserId;
    await user.save();
    return true;
  } catch (err) {
    // error handling here, but skip for now
    return false;
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const action = require("../hasura/hasura-action");
    const query = require("../hasura/queries/get-user-status");
    const graphqlQuery = {
      query: query(user.hasuraUserId),
    };
    const data = await action(graphqlQuery);
    console.log(data);
    const userStatus = data.data?.users_by_pk?.status ?? user.status;

    res.status(200).json({ status: userStatus });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    await updateHasuraUserStatus(user.hasuraUserId, newStatus);
    res.status(200).json({ message: "User updated." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateHasuraUserStatus = async (id, status) => {
  const action = require("../hasura/hasura-action");
  const query = require("../hasura/queries/update-user-status");
  const graphqlQuery = {
    query: query(id, status),
  };
  try {
    const data = await action(graphqlQuery);
    const errors = data["errors"];

    console.log(data);
    if (errors !== undefined) {
      return {
        success: false,
        message: data["errors"][0]["message"],
      };
    } else {
      return {
        success: true,
        status: data.data["insert_users_one"]["status"],
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Internal error",
    };
  }
};

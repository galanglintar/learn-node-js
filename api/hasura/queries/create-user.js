const createUserMutation = (email, name, password, status) => {
  return `
        mutation createUser {
            insert_users_one(object: {email: "${email}", 
            name: "${name}", password: "${password}", status: "${status}"}) {
                _id
            }
        }
    `;
};

module.exports = createUserMutation;

const checkUserQuery = (id) => {
  return `
        query checkUser {
            users_by_pk(_id: "${id}") {
                email
            }
        }
    
    `;
};

module.exports = checkUserQuery;

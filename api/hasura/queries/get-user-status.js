const getUsersStatusQuery = (id) => {
  return `
        query getUserStatus {
            users_by_pk(_id: "${id}") {
                status
            }
        }
    
    `;
};

module.exports = getUsersStatusQuery;

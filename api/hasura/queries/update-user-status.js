const updateUserStatusMutation = (id, newStatus) => {
  return `
        mutation updateUserStatus {
            update_users_by_pk(pk_columns: {_id: "${id}"}, 
            _set: {status: "${newStatus}"}) {
                status
            }
        }
    `;
};

module.exports = updateUserStatusMutation;

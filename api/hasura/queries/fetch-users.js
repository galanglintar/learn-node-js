const fetchUsersQuery = `
    query fetchUsers {
        users {
            email
            status
        }
    }
`;

module.exports = fetchUsersQuery;

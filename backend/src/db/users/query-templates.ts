export const selectUsersTemplate = `
SELECT users.*, addresses.*, users.id as id
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id
ORDER BY users.name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

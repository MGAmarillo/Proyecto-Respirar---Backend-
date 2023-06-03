const users = [
  {
    username: 'admin@respirar.com',
    // admin1234
    password: '$2b$08$TEXenwkpjny0wG1U0t3pEuOwp07p3uZMY7VyzTxRD6sJtt/HLGFPS',
    id: 1
  },
  {
    username: 'user@respirar.com',
    // user1234
    password: '$2b$08$t0rmv0cnZkj6XdUcjFJoBeg6D9ZVK0bsa3UA.Mdnpo/b2JFQUaBrm',
    id: 2
  }
]

const findByUsername = (username) => {
  return users.find(user => user.username === username);
}

export { users, findByUsername }

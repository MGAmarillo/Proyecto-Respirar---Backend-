const users = [
  {
    username: 'admin@respirar.com',
    password: '$2b$08$TEXenwkpjny0wG1U0t3pEuOwp07p3uZMY7VyzTxRD6sJtt/HLGFPS'
  },
  {
    username: 'user@respirar.com',
    password: '$2b$08$t0rmv0cnZkj6XdUcjFJoBeg6D9ZVK0bsa3UA.Mdnpo/b2JFQUaBrm'
  }
]

const findByUsername = (username) => {
  return users.find(user => user.username === username);
}

export { users, findByUsername }

// Modeling User Table
// ----------------------

export const User = {
    id: 'string',
    email: 'string',
    password: 'string',
    createdAt: 'Timestamp',
    updateAt: 'Timestamp',
    photoUrl: 'string',
    role: 'Enum [Super, Admin, User]',
    active: false,
    name: 'striing',
    nid: 'string',
    mobile: 'string',
    lastLoggedIn: 'Timestamp',
    lastLoggedOut: 'Timestamp',
    locked: false, 

    inId: 'string', /* Institution Id Only for Admin and Super */
}


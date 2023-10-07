class User {
    constructor(email, name, username, password, admin) {
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
        this.admin = admin;
    }
}

module.exports = User;
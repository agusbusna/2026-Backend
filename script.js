console.log("Hola desde el servidor")
console.log("esto es backend?")

const filesystem = require("fs")

let contenido = filesystem.readFileSync("./test.txt")



const users = [
    {
        _id: 1,
        name: "pepe",
        email: "pepe@gmail.com",
        role: {
            name: "User",
            _id: 1
        },
        profile: {
            lang: "es",
            isDark: true
        }
    },
    {
        _id: 2,
        name: "jose",
        email: "jose@gmail.com",
        role: {
            name: "User",
            _id: 2
        },
        profile: {
            lang: "en",
            isDark: false
        }
    },
    {
        _id: 3,
        name: "julia",
        email: "julia@gmail.com",
        role: {
            name: "Admin",
            _id: 3
        },
        profile: {
            lang: "de",
            isDark: true
        }
    },
]

function formatUser(user){
    return {
                user_id: user._id,
                user_name: user.name,
                user_email: user.email,
                role_name: user.role.name,
                role_id: user.role._id,
                profile_lang: user.profile.lang,
                profile_isDark: user.profile.isDark
            }  
    }

function formatUsers (users){
    const result = []
    for (const user of users) {
        result.push(formatUser(user))
    }
    return result
}

function getUserById(users, user_id) {
    for(const user of users){
        if (user._id === user_id) {
            return user;
        }
    }
    return null
}

// Devuelve la lista de usuarios con ese role_id en particular

function getUsersByRole(users, role_id){
    const roleResult = [];
    for (const user of users) {
        if (user.role._id === role_id)
            roleResult.push(formatUser(user));
    }
    return roleResult;
}

function deleteUserById(users, user_id) {
    for (let i = 0; 
        i < users.length; 
        i++) {
        if (users[i]._id === user_id) {
            users.splice(i, 1);
            return true;
        }
    }

    return false;
}

console.log(getUsersByRole(users, 2));

console.log (formatUser(users[1]));
console.log(deleteUserById(users, 3));
console.log(deleteUserById(users, 2));
console.log(users)

/* 
Dado el array de usuarios desarrollar:
formatUsers(users)
    Debe devolver un array donde cada usuario tendra el siguiente formato:
        {
            user_id: ,
            user_name: ,
            user_email: ,
            role_name: ,
            role_id: ,
            profile_lang: ,
            profile_isDark
        }
getUserById(users, user_id)
    Debe devolver el usuario con ese user_id o null si no encuentra

    formatUser(user) (nueva)
    - devolver el usuario formateado
    - podrian usarla en formatUsers para centralizar el formato
    {
        user_id: ,
        user_name: ,
        user_email: ,
        role_name: ,
        role_id: ,
        profile_lang: ,
        profile_isDark
    }
    
getUsersByRole(users, role_id) (nueva)
    - Devuelve la lista de usuarios con ese role_id en particular
deleteUserById(users, user_id) (nueva)
    - Elimina el usuario por id (devuelve true o false en base a si lo logro)
*/

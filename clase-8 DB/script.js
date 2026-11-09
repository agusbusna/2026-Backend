import mysql from 'mysql2/promise.js'

const pool = mysql.createPool(

    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: '2026_utn_pwa',
        port: 3306,
    }
)

function crearUsuario (){
    /* Se ejecuta  a la DB el codigo de insercion */
    pool.execute(
        'INSERT INTO usuarios (email, password, nombre) VALUES ("maria@gmail.com", "123", "maria")'
    )
}

//crearUsuario()
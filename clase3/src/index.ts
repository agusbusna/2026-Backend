/*  
    Paradigma de Programacion
        . Programación funcional
        . POO (Programación Orientada a Objetos): 
            Todos los problemas  en nuestro codigo lo vamos a resolver a partir de los objetos de nuestro codigo
            Para crear objetos usaremos "moldes"/"plantillas" llamadas clases. 
        */

//Objeto literal

const user_1 = {
    name: 'pepe',
    id: 1,
    email: 'pepe@gmail.com'
}


const user_2 = {
    name: 'julieta',
    id: 2,
    email: 'julieta@gmail.com'
}

class User {
    name: string
    id: number
    email: string
    dinero: number
    constructor(name: string, email: string, id: number){
        this.name = name
        this.email = email
        this.id = id
        this.dinero = 0
    }

}
//Quiero crear un usuario
//Si queremos instanciar la clase User debemos usar la palabra 'new'
// new class() invoca a la funcion constructora


const usuario_1 = new User('pepe', 'pepe@gmail.com', 1)

/* console.log(usuario_1) */
/*  
    La clase = molde
    Objeto = resultado de usar el molde y crear algo
    Instancia = el momento donde se usa el molde
    this = en contexto de la funcion constructora es una referencia a la instancia que se está creando
*/

/* 
Crear la clase Product que tenga las propiedades
id
title
description
stock
price
discount -> siempre inicia en 0
Crear 3 productos
*/

class Product {
    title: string
    id: number
    description: string
    stock: number
    price: number
    discount: number
    constructor(title: string, id: number, description: string, stock: number, price: number){
        this.title = title
        this.id = id
        this.description = description
        this.stock = stock
        this.price = price
        this.discount = 0
    }
}

const product_1 = new Product ('TV Samsung 40', 1, 'Smart TV Android, full HD', 5, 900000)
const product_2 = new Product ('TV LG 50', 1, 'Smart TV Android, 4k', 2, 1500000)
const product_3 = new Product ('Heladera Drean', 1, 'No frost, 250lts', 1, 500000)
/* 
console.log(product_1)

console.log(product_2)

console.log(product_3) */

type Seniority = 'entry' | 'junior' | 'mid' | 'senior' | 'mid-senior'
interface SeniorityConfig {
    seniority_label: Seniority,
    increase_percentage: number
}
//probar de hacerlo con eso
/* const seniorities: Seniority[]= [
    'entry', 
    'junior', 
    'mid', 
    'mid-senior',
    'senior']
 */

    const seniorities: SeniorityConfig[]= [
    {
        seniority_label: 'entry',
        increase_percentage: 0,
    },
    {
        seniority_label: 'junior',
        increase_percentage: 5
    },
    {
        seniority_label: 'mid',
        increase_percentage: 10
    },
    {
        seniority_label: 'mid-senior',
        increase_percentage: 20
    },
    {
        seniority_label: 'senior',
        increase_percentage: 50
    },

    ]

class Empleado {
    nombre: string
    id: number
    email: string
    dinero: number
    salario: number
    seniority: Seniority
    puesto: string
    constructor(nombre: string, email: string, id: number, seniority: Seniority, puesto: string, salario: number){
        this.nombre = nombre
        this.email = email
        this.id = id
        this.seniority = seniority
        this.puesto = puesto
        this.salario = salario
        this.dinero = 0
        
    }
    cobrar(): void{
        this.dinero = this.dinero + this.salario
    }

    saludar(): string {
        return 'Hola a todos, mi nombre es ' + this.nombre + '!'
    }

    cambiarEmail(nuevo_mail: string): void {
        this.email = nuevo_mail
    }
    aumentarSueldo(porcentaje_aumento: number): void{
        //se pueden declarar variables adentro
        let aumento: number = this.salario * (porcentaje_aumento/100)
        this.salario= this.salario + aumento
    }
    /* (Esta forma es menos óptima, porque si agrego más escalones en el seniority no me es tan útil y tengo que agregar más pasos)
        aumentarSeniority():void{
        if(this.seniority === 'entry'){
            this.seniority = 'junior'
        } else if (this.seniority === 'junior'){
            this.seniority = 'mid'
        } else if (this.seniority === 'mid'){
            this.seniority = 'senior'
        } 
    } */
/*     aumentarSeniority(): void{
        const indiceSeniorityActual = seniorities.indexOf(this.seniority)
        
        //Saber si estoy en el último escalon de seniority
        if (indiceSeniorityActual === seniorities.length - 1) {
            return
        }
        this.seniority = seniorities[indiceSeniorityActual + 1]
    } */
    aumentarSeniority(): void{
        //Verificamos si estamos en el ultimo nivel posible
        if(this.seniority === seniorities[seniorities.length - 1].seniority_label){
            return
        }

        for(let seniority of seniorities){
            
            if(this.seniority === seniority.seniority_label){
                const indice_seniority = seniorities.indexOf(seniority)
                const seniority_siguente: SeniorityConfig = seniorities[indice_seniority + 1]
                this.seniority = seniority_siguente.seniority_label
                this.aumentarSueldo(seniority_siguente.increase_percentage)
                break;
            }
        }
    }
}

const empleado_1 = new Empleado('pepe', 'pepe@gmail.com', 1, 'entry', 'backend', 1000)

empleado_1.cobrar()
empleado_1.cambiarEmail('jose@gmail.com')
empleado_1.aumentarSeniority()

empleado_1.aumentarSeniority()

empleado_1.aumentarSeniority()
console.log(empleado_1)

console.log(empleado_1.saludar())

/*
Agregar propiedades:
    - seniority: 'entry' | 'junior' | 'mid' | 'senior'
    - puesto
Definir los metodos en la clase empleado:
    - aumentarSueldo(porcentaje_aumento) Aumenta el salario por ese porcentaje
    - aumentarSeniority () Segun el seniority actual debe subir una categoria mas 'entry' => 'junior' => 'mid' => 'senior'. Si es senior se queda como esta.
    
*/
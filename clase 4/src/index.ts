class User {
    id: number
    name: string
    email: string
    constructor(id: number, name: string, email: string){
        this.id = id 
        this.name = name
        this.email = email}
}

//Con esta clase generamos un objeto que maneje la lista de usuarios

class UsersManager {
    users: User[]
    id_counter: number 
    constructor(){
        this.id_counter = 0
        this.users = []
    }

    //Creamos un metodo que permite agregar un usuario a la lista de usuarios
    create(name: string, email: string): void{
        const new_user = new User(this.id_counter, name, email)
        this.id_counter = this.id_counter + 1
        this.users.push(new_user)
    }
}


const userManager = new UsersManager()

/* console.log(userManager) */

userManager.create('pepe', 'pepe@gmail.com')

/* console.log(userManager) */

/* 
Crear la clase Product:
    - id
    - title
    - price
    - percentage_discount
    - description
    - stock
    - categories string[] EJ: ['tecnologia', 'hogar']
    METODOS:
        -agregarCategoria(nueva_categoria)
            agrega la categoría, si no existe previamente
            devuelve boolean indicando si la operacion se pudo realizar
        -eliminarCategoria(categoria)
            eliminar en caso de que exista
            devuelve boolean indicando si la operacion se pudo realizar
Crear la clase ProductManager:
    - products: Product[]
    - id_counter: number = 0
    METODOS: 
        - create(title, price, percentage_discount, description, stock, categories)
            devuelve el id del producto creado
        
        - getById(product_id)
            devuelve el producto buscado por id o null si no existe
        - filtrarPorCategoria(categorias_filtradas)
            Recibe un array de categorias y debe devolver a los productos que tengan esas categorias
            Protip: recuerden que con .includes pueden saber si cierto elemento está en otro array:
            const nombres = ['pepe', 'juan', 'maria']
            console.log(nombres.includes('juan'))//true
            console.log(nombres.includes('juanito'))//false
*/



class Product {
    id: number
    title: string
    price: number
    percentage_discount: number
    description: string
    stock: number
    categories: string[]
    constructor(id: number, title: string, price: number, percentage_discount: number, description: string, stock: number, categories: string[]){
        this.title = title
        this.id = id
        this.price = price
        this.percentage_discount = percentage_discount
        this.description = description
        this.stock = stock
        this.categories = categories
    }
    addCategory(new_category:string): boolean{
        const already_exist_category = this.categories.includes(new_category)
        if(already_exist_category){
            return false
        }
        this.categories.push(new_category)
        return true
    }
    deleteCategory(category:string): boolean{
        for (let indice = 0;
            indice < this.categories.length;
            indice = indice + 1){
            const already_exist_category = this.categories[indice]
            if (already_exist_category === category){
                this.categories.splice(indice, 1)
                return true
            }
        }
        return false
    }
    deleteCategory_2(category:string): boolean{
        const already_exist_category = this.categories.includes(category)
        if(already_exist_category){
            const index_category = this.categories.indexOf(category)
            this.categories.splice(index_category, 1)
            return true
        }
        return false
    }
}

class ProductManager{
    products: Product[]
    id_counter: number
    constructor(){
        this.products = []
        this.id_counter = 0
    }

    create (
        title: string, 
        price: number, 
        percentage_discount: number, 
        description: string, 
        stock: number, 
        categories: string[]): number{
        const new_product = new Product (this.id_counter, title, price, percentage_discount, description, stock, categories)
        this.id_counter = this.id_counter + 1
        this.products.push(new_product)
        return new_product.id
    }

    getById(product_id: number): Product | null{
        
        for(const product of this.products){
            if(product.id === product_id){
                return product;
            }
        }
        return null
    }

    filterByCategories(categories_filter: string[]): Product[]{
        let filtered_products: Product[] = [] 
        
        for(const product of this.products){
            let all_categories = true
            for (const category of categories_filter){
                if(!toLowerCaseAll(product.categories).includes(category.toLowerCase())){
                    all_categories = false
                }
            }
            if (all_categories){
                filtered_products.push(product)
            }
        }
        return filtered_products
    }
}

function toLowerCaseAll(strings: string[]): string[]{
    const stringsLowerCase = []
    for(let string of strings){
        stringsLowerCase.push(string.toLowerCase())
    }
    return stringsLowerCase
}

const productManager = new ProductManager()
const new_product_id = productManager.create('TV Android 20', 50000, 0, 'Televisor de 20 pulgadas', 1, ['Tecnologia'])


productManager.create(
    'TV Samsung 40',
    80000, 
    5, 
    'Televisor de 40 pulgadas', 
    1, 
    ['Tecnologia', 'Hogar']
)
productManager.create(
    'TV Samsung 4',
    80000, 
    5, 
    'Televisor de 40 pulgadas', 
    1, 
    ['Electronica', 'Hogar', 'Navidad']
)
productManager.create(
    'TV Samsung 4',
    80000, 
    5, 
    'Televisor de 40 pulgadas', 
    1, 
    ['Electro', 'Navidad']
)
/* console.log(productManager) */
/* console.log(productManager)

console.log(productManager.getById(0))
console.log(new_product_id) */
const producto = new Product(1, "Remera", 5000, 10, "Remera de algodón", 20, ["ropa", "verano"])

// Caso 1: categoría nueva (debería agregarla y devolver true)
const resultado_nueva = producto.addCategory("oferta")
/* console.log(resultado_nueva)
console.log(producto.categories) */

// Caso 2: categoría repetida (no debería agregarla y devolver false)
const resultado_repetida = producto.addCategory("ropa")
/* console.log( resultado_repetida)
console.log( producto.categories) */

// Caso 3: categoría vacía (no debería agregarla y devolver false)
const resultado_vacia = producto.addCategory("")
/* console.log(resultado_vacia)
console.log(producto.categories)

console.log(producto.categories) */


console.log(productManager.filterByCategories(['hogar']))
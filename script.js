//Exchange rate API
/*
Fetch API : esto se usa para hacer un Http request al backend
Podemos realizar llamados también a APIs de terceros

*/

/* 

Simulando un fetch a un objeto json local
Esto es un ejemplo de lo que es un request
fetch() es una función que ya viene incluida en los navegadores
GET: capturando datos de un servidor
POST: entregando datos a un servidor
PUT:  Actualizando información en un servidor
DELETE: Borrando información en un servidor

fetch() -> retorna una promesa con el método .then()

fetch() -> retorna una promesa con el método .then(response=>console.log(response))

al then() le aplicamos una función flecha para caracterizar la respuesta

status:
    200 conexión exitosa
    201 conexión exitosa con una modificación ejecutada

    300..range es redirect

    400..range es un error de usuario

    500..range es un server error
*/
function calculate(){
    fetch('items.json').then(response => console.log(response)); //para saber el estado de conexión
    fetch('items.json')
    .then(response => response.json()) //paso 1:Se aplica la función json() para guardar los datos del objeto JSON
    .then(data=>console.log(data)) //paso 2:El segundo then() permite leer los datos guardados
    // .then(lectura=>(document.body.innerHTML=lectura[0].text)); //Una vez obtenida la respuesta podemos acceder a un elemento del objeto JSON
    
}


calculate();


/*-------------de nuevo al proyecto---------------*/


const currencyEl_one =document.getElementById('currency-one');
const currencyEl_two =document.getElementById('currency-two');
const amountEl_one =document.getElementById('amount-one');
const amountEl_two =document.getElementById('amount-two');

const rateEl =document.getElementById('rate');
const swap = document.getElementById('swap');


//Fetch exchange rate and update the DOM
function capture(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    //console.log(currency_one, currency_two);
    //Hacemos el llamado a la API con una variable interna
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res=>res.json())
    //.then(data=>console.log(data))
    .then(data=>{
        const rate = data.rates[currency_two];
        console.log(data);
        //console.log(rate);
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });

}

currencyEl_one.addEventListener('change', capture);
amountEl_one.addEventListener('input', capture);
currencyEl_two.addEventListener('change', capture);
amountEl_two.addEventListener('input', capture);

swap.addEventListener('click', ()=>{
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    capture();

})


capture();
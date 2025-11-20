let anyo = document.getElementById("year").textContent = new Date().getFullYear();
(function(){
    
    const cambiarBtn = document.getElementById("cambiarBtn");
    cambiarBtn.addEventListener('click',fetchApi)

    // Función para llenar el datalist al cargar la página
    async function cargarMonedas() {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) {
            throw new Error("No se pudieron cargar las monedas");
        }
        const data = await response.json();
        const rates = data.rates;
        const monedas = Object.keys(rates);

        const datalist = document.getElementById("monedas");
        datalist.innerHTML = "";
        monedas.forEach(moneda => {
            const option = document.createElement("option");
            option.value = moneda;
            datalist.appendChild(option);
        });
    }
    window.addEventListener("DOMContentLoaded", cargarMonedas);

    async function fetchApi(){
        const moneda1 = document.getElementById("moneda1").value.toUpperCase();
        const moneda2 = document.getElementById("moneda2").value.toUpperCase();
        const valor1 = document.getElementById("cantidad1").value;
        const valor2 = document.getElementById("cantidad2");
        const error = document.getElementById("error");

        if(moneda1 === "" || moneda2 === ""){
            alert("Por favor elige las dos monedas.");
            return;
        }
        try{
            const response = await fetch(`https://open.er-api.com/v6/latest/${moneda1}`);

            if(!response.ok){
                throw new Error("fetch incorrecto");
            }

            const data = await response.json();
            const moneda  = data.rates[moneda2];
            const res = moneda.toFixed(2) * valor1;
            valor2.value = res;

            console.log(res);
        }catch(err){
            console.log(err);
            error.textContent = "Error en tipo de moneda";
            error.style.display = "block";
        }
    


    }

})();

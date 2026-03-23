document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("formTrabajador").addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const puesto = document.getElementById("puesto").value;
        const departamento = document.getElementById("departamento").value;
        const fecha_contratacion = document.getElementById("fecha_contratacion").value;

        console.log("Datos leídos:", nombre, edad, puesto, departamento, fecha_contratacion);

        if (!nombre || !edad || !puesto || !departamento || !fecha_contratacion) {
            alert("Por favor completa todos los campos.");
            return;
        }

        // Guardar en localStorage
        let lista = JSON.parse(localStorage.getItem("trabajadores")) || [];
        const trabajador = { nombre, edad, puesto, departamento, fecha_contratacion };
        lista.push(trabajador);
        localStorage.setItem("trabajadores", JSON.stringify(lista));

        // Guardar en la base de datos vía backend
        try {
            const res = await fetch("http://localhost:3000/agregar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trabajador)
            });

            const data = await res.json();
            console.log(data);

            alert("Trabajador guardado en la base de datos ✔");

        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor ❌");
        }

        // Limpiar formulario
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("puesto").value = "";
        document.getElementById("departamento").value = "";
        document.getElementById("fecha_contratacion").value = "";
    });

});



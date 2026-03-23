document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const nombre = document.getElementById("nombre");
    const edad = document.getElementById("edad");
    const puesto = document.getElementById("puesto");
    const departamento = document.getElementById("departamento");
    const fecha = document.getElementById("fecha_contratacion");

    // ✅ OBTENER DATOS (GET correcto)
    const res = await fetch(`https://miapitrabajadores.onrender.com/obtener/${id}`);
    const data = await res.json();

    nombre.value = data.nombre;
    edad.value = data.edad;
    puesto.value = data.puesto;
    departamento.value = data.departamento;
    fecha.value = data.fecha_contratacion;

    // =========================
    // GUARDAR CAMBIOS
    // =========================
    document.getElementById("formEditar").addEventListener("submit", async (e) => {
        e.preventDefault();

        const actualizado = {
            nombre: nombre.value,
            edad: parseInt(edad.value),
            puesto: puesto.value,
            departamento: departamento.value,
            fecha_contratacion: fecha.value
        };

        await fetch(`https://miapitrabajadores.onrender.com/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actualizado)
        });

        alert("Trabajador actualizado correctamente ✔");
        window.location.href = "consulta.html";
    });

});
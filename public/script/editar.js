document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const nombre = document.getElementById("nombre");
    const edad = document.getElementById("edad");
    const puesto = document.getElementById("puesto");
    const departamento = document.getElementById("departamento");
    const fecha = document.getElementById("fecha_contratacion");

    // Cargar datos del trabajador
    const res = await fetch(`http://localhost:3000/obtener/${id}`);
    const data = await res.json();

    nombre.value = data.nombre;
    edad.value = data.edad;
    puesto.value = data.puesto;
    departamento.value = data.departamento;
    fecha.value = data.fecha_contratacion;

    // Guardar cambios
    document.getElementById("formEditar").addEventListener("submit", async (e) => {
        e.preventDefault();

        const actualizado = {
            nombre: nombre.value,
            edad: edad.value,
            puesto: puesto.value,
            departamento: departamento.value,
            fecha_contratacion: fecha.value
        };

        await fetch(`http://localhost:3000/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actualizado)
        });

        alert("Trabajador actualizado correctamente ✔");
        window.location.href = "consulta.html";
    });

});

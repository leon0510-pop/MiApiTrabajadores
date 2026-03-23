document.addEventListener("DOMContentLoaded", () => {

    const tabla = document.getElementById("tablaTrabajadores");

    function mostrar() {
        fetch("https://miapitrabajadores.onrender.com/mostrar")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al obtener datos del servidor");
                }
                return res.json();
            })
            .then(data => {
                tabla.innerHTML = "";

                data.forEach(trabajador => {
                    const fila = document.createElement("tr");

                    const fechaFormateada = trabajador.fecha_contratacion.split("T")[0];

                    fila.innerHTML = `
                        <td>${trabajador.id}</td>
                        <td>${trabajador.nombre}</td>
                        <td>${trabajador.edad}</td>
                        <td>${trabajador.puesto}</td>
                        <td>${trabajador.departamento}</td>
                        <td>${fechaFormateada}</td>

                        <td>
                            <button class="btnEditar" data-id="${trabajador.id}">✏️ Editar</button>
                        </td>
                        <td>
                            <button class="btn-eliminar" data-id="${trabajador.id}">🗑️ Eliminar</button>
                        </td>
                    `;

                    tabla.appendChild(fila);
                });
            })
            .catch(err => {
                console.error("Error al mostrar:", err);
            });
    }

    // ===============================
    // EVENTOS
    // ===============================
    tabla.addEventListener("click", async (e) => {
        const btn = e.target;

        // EDITAR
        if (btn.classList.contains("btnEditar")) {
            const id = btn.dataset.id;
            window.location.href = `editar.html?id=${id}`;
        }

        // ELIMINAR
        if (btn.classList.contains("btn-eliminar")) {
            const id = btn.dataset.id;

            if (!confirm("¿Seguro que deseas eliminar este trabajador?")) return;

            try {
                const res = await fetch(`https://miapitrabajadores.onrender.com/eliminar/${id}`, {
                    method: "DELETE"
                });

                if (!res.ok) throw new Error("Error al eliminar");

                alert("Registro eliminado correctamente ✔");
                mostrar(); // recargar tabla
            } catch (err) {
                console.error(err);
                alert("Error eliminando el trabajador ❌");
            }
        }
    });

    // 👉 ESTE VA AFUERA
    mostrar();

});
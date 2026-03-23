document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("tablaTrabajadores");

    function mostrar() {
        fetch("http://localhost:3000/mostrar")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al obtener datos del servidor");
                }
                return res.json();
            })
            .then(data => {
                tabla.innerHTML = ""; // limpia la tabla

                data.forEach(trabajador => {
                    const fila = document.createElement("tr");

                    fila.innerHTML = `
            <td>${trabajador.id}</td>
            <td>${trabajador.nombre}</td>
            <td>${trabajador.edad}</td>
            <td>${trabajador.puesto}</td>
            <td>${trabajador.departamento}</td>
            <td>${trabajador.fecha_contratacion}</td>

            <td>
                <button class="btnEditar" data-id="${trabajador.id}">✏️ Editar</button>
                
            </td>
            <td>
             <!-- Botón Eliminar -->
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
   
    // ===================================
    // EVENTOS PARA EDITAR Y ELIMINAR
    // ===================================

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
                const res = await fetch(`http://localhost:3000/eliminar/${id}`, {
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
     // 👉 Mostrar automáticamente al cargar
    mostrar();
});

  
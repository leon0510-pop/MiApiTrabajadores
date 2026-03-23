function eliminar(id) {
    if (confirm("¿Seguro que quieres eliminar este trabajador?")) {

       fetch(`https://miapitrabajadores.onrender.com/eliminar/${id}`, {
    method: "DELETE"
            })
        .then(res => res.json())
        .then(data => {
            alert("Trabajador eliminado");
            mostrar(); // Vuelve a dibujar la tabla
        })
        .catch(err => console.error("Error:", err));
    }
}

const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./conexion"); // conexión a PostgreSQL

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir tu carpeta HTML
app.use(express.static(path.join(__dirname, "public")));

//========================
// GUARDAR TRABAJADOR
//========================
app.post("/agregar", async (req, res) => {
    try {
        const { nombre, edad, puesto, departamento, fecha_contratacion } = req.body;

        const query = `
            INSERT INTO personal (nombre, edad, puesto, departamento, fecha_contratacion)
            VALUES ($1, $2, $3, $4, $5)
        `;

        await pool.query(query, [nombre, edad, puesto, departamento, fecha_contratacion]);

        res.json({ mensaje: "Trabajador guardado en la base de datos" });

    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).json({ error: "Error al guardar en la base de datos" });
    }
});

//=========================
// CONSULTAR TRABAJADORES
//=========================

app.get("/mostrar", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM personal ORDER BY id ASC");
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

//=========================
// EDITAR TRABAJADOR
//=========================

// Obtener 1 trabajador
app.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM personal WHERE id=$1", [id]);
    res.json(result.rows[0]);
});

// Editar trabajador
app.put("/editar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, puesto, departamento, fecha_contratacion } = req.body;

    await pool.query(`
        UPDATE personal SET 
        nombre=$1, edad=$2, puesto=$3, departamento=$4, fecha_contratacion=$5
        WHERE id=$6
    `, [nombre, edad, puesto, departamento, fecha_contratacion, id]);

    res.json({ mensaje: "Actualizado correctamente" });
});

//========================
// ELIMINAR TRABAJADOR
//========================

app.delete('/eliminar/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await pool.query('DELETE FROM personal WHERE id = $1', [id]);

        res.json({ mensaje: "Trabajador eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ error: "Error al eliminar trabajador" });
    }
});




// =========================
//   INICIAR SERVIDOR
// =========================
app.listen(3000, () => {
    console.log("Servidor listo en: http://localhost:3000");
});

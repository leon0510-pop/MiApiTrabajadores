const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./conexion");

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "public")));

// ========================
// RUTA BASE (para probar)
// ========================
app.get("/", (req, res) => {
    res.send("API de trabajadores funcionando 🚀");
});

// =========================
// GUARDAR TRABAJADOR
// =========================
app.post("/agregar", async (req, res) => {
    try {
        const { nombre, edad, puesto, departamento, fecha_contratacion } = req.body;

        const query = `
            INSERT INTO personal (nombre, edad, puesto, departamento, fecha_contratacion)
            VALUES ($1, $2, $3, $4, $5)
        `;

        await pool.query(query, [nombre, edad, puesto, departamento, fecha_contratacion]);

        res.json({ mensaje: "Trabajador guardado correctamente" });

    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).json({ error: "Error al guardar en la base de datos" });
    }
});

// =========================
// CONSULTAR TODOS
// =========================
app.get("/mostrar", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM personal ORDER BY id ASC");
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// =========================
// OBTENER UNO
// =========================
app.get("/obtener/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("SELECT * FROM personal WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener trabajador" });
    }
});

// =========================
// ACTUALIZAR
// =========================
app.put("/editar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, puesto, departamento, fecha_contratacion } = req.body;

        const result = await pool.query(`
            UPDATE personal SET 
            nombre=$1, edad=$2, puesto=$3, departamento=$4, fecha_contratacion=$5
            WHERE id=$6
        `, [nombre, edad, puesto, departamento, fecha_contratacion, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.json({ mensaje: "Actualizado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar" });
    }
});

// =========================
// ELIMINAR
// =========================
app.delete("/eliminar/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM personal WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.json({ mensaje: "Eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// =========================
// INICIAR SERVIDOR
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
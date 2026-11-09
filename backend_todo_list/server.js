import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Endpoint untuk mencoba koneksi express
// app.get("/", (req, res) =>
//   res.json({ info: "To-Do List API with Express and Supabase" }),
// );

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods:["GET","POST","PUT","DELETE"]
}))

app.use(express.json());

// TODO 1: Endpoint untuk mengambil semua tugas --> /api/todos
app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.todo_items");

    res.status(200).json({
      message: "Semua tugas berhasil diambil",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil tugas",
      errorMessage: error.message,
    });
  }
});

// TODO 2: Endpoint untuk mengambil tugas berdasarkan id --> /api/todos/:id
app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM public.todo_items WHERE id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: `Tugas dengan id = ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      message: `Tugas dengan id = ${id} berhasil ditemukan`,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal mengambil tugas dengan id = ${id}`,
      errorMessage: error.message,
    });
  }
});

// TODO 3: Endpoint untuk menambah tugas --> /api/todos
app.post("/api/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, priority, deadline, status } = req.body;

    const result = await pool.query(
      "INSERT INTO public.todo_items (title, description, priority, deadline, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, priority, deadline, status],
    );

    res.status(201).json({
      message: "Tugas berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambah tugas",
      errorMessage: error.message,
    });
  }
});

// TODO 4: Endpoint untuk memperbarui tugas berdasarkan id --> /api/todos/:id
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { title, description, priority, deadline, status } = req.body;

    const result = await pool.query(
      `UPDATE public.todo_items 
      SET title = $1,
        description = $2,
        priority = $3,
        deadline = $4,
        status = $5 WHERE id = $6 RETURNING *`,
      [title, description, priority, deadline, status, id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: `Tugas dengan id = ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      message: `Tugas dengan id = ${id} berhasil diperbarui`,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal memperbarui tugas dengan id = ${id}`,
      errorMessage: error.message,
    });
  }
});

// TODO 5: Endpoint untuk menghapus tugas berdasarkan id --> /api/todos/:id
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM public.todo_items WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: `Tugas dengan id = ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      message: `Tugas dengan id = ${id} berhasil dihapus`,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal menghapus tugas dengan id = ${id}`,
      errorMessage: error.message,
    });
  }
});

app.listen(PORT, () =>
  console.log(
    new Date().toLocaleTimeString() + `: Server is running on port ${PORT}...`,
  ),
);

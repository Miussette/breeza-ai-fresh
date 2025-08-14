import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chat"; // sin extensión gracias a TS + tsconfig

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/ping", (_req: Request, res: Response) => {
  res.json({ message: "Servidor funcionando correctamente 🚀" });
});

// Rutas del chatbot
app.use("/api", chatRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
//Routes
import prTestRouter from "./routes/prtest.js";
import snTestRouter from "./routes/sntest.js";

const app = express();

app.use(cors());
app.use("/prtest", prTestRouter);
app.use("/sntest", snTestRouter);

app.listen(8080, () => console.log("Conectado en puerto 8080"));

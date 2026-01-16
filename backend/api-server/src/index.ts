import express from "express";
import { authenticate } from "./authMiddleware";

const app = express();

app.get("/api/profile", authenticate, (req, res) => {
  res.json({
    id: (req as any).user.sub,
    name: "Demo User"
  });
});

app.listen(5001, () =>
  console.log("API Server running on http://localhost:5001")
);

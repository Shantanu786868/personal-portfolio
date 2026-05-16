import { Router } from "express";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const phpRes = await fetch("http://localhost:8000/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await phpRes.json();
    res.status(phpRes.status).json(data);
  } catch (err) {
    req.log.error(err, "Failed to reach PHP contact server");
    res.status(502).json({ success: false, message: "Contact service unavailable." });
  }
});

export default router;

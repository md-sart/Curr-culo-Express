import { Router } from "express";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    const { name, email, profession, summary } = req.body;
    const newUser = await req.context.models.User.create({ name, email, profession, summary });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    await user.update(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const result = await req.context.models.User.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;

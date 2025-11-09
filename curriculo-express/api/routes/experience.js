import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const experiences = await req.context.models.Experience.findAll();
    return res.status(200).json(experiences);
  } catch (error) {
    console.error("Erro ao buscar experiências:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newExperience = await req.context.models.Experience.create(req.body);
    return res.status(201).json(newExperience);
  } catch (error) {
    console.error("Erro ao criar experiência:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const experience = await req.context.models.Experience.findByPk(req.params.id);
    if (!experience) return res.status(404).json({ error: "Experiência não encontrada" });
    await experience.update(req.body);
    return res.status(200).json(experience);
  } catch (error) {
    console.error("Erro ao atualizar experiência:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await req.context.models.Experience.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ error: "Experiência não encontrada" });
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar experiência:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;

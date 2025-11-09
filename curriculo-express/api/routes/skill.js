import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const skills = await req.context.models.Skill.findAll();
    return res.status(200).json(skills);
  } catch (error) {
    console.error("Erro ao buscar habilidades:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSkill = await req.context.models.Skill.create(req.body);
    return res.status(201).json(newSkill);
  } catch (error) {
    console.error("Erro ao criar habilidade:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const skill = await req.context.models.Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: "Habilidade não encontrada" });
    await skill.update(req.body);
    return res.status(200).json(skill);
  } catch (error) {
    console.error("Erro ao atualizar habilidade:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await req.context.models.Skill.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ error: "Habilidade não encontrada" });
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar habilidade:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;

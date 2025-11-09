import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const educations = await req.context.models.Education.findAll();
    return res.status(200).json(educations);
  } catch (error) {
    console.error("Erro ao buscar formações:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newEducation = await req.context.models.Education.create(req.body);
    return res.status(201).json(newEducation);
  } catch (error) {
    console.error("Erro ao criar formação:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const education = await req.context.models.Education.findByPk(req.params.id);
    if (!education) return res.status(404).json({ error: "Formação não encontrada" });
    await education.update(req.body);
    return res.status(200).json(education);
  } catch (error) {
    console.error("Erro ao atualizar formação:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await req.context.models.Education.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ error: "Formação não encontrada" });
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar formação:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;

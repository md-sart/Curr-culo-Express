
const isAuthenticated = (req, res, next) => {
  if (!req.context || !req.context.models) {
    return res.status(401).send("Unauthorized: contexto não encontrado");
  }

  req.context.me = { id: 1, username: "demo_user" };
  next();
};

const isResourceOwner = (resourceModel) => async (req, res, next) => {
  try {
    const resource = await req.context.models[resourceModel].findByPk(
      req.params.id
    );

    if (!resource) {
      return res.sendStatus(404);
    }

    if (resource.userId && resource.userId !== req.context.me.id) {
      return res.status(403).send("Forbidden: não é o dono do recurso");
    }

    req.resource = resource;
    next();
  } catch (error) {
    console.error("Erro no middleware de autorização:", error);
    res.status(500).send("Erro interno no middleware de autorização");
  }
};

export { isAuthenticated, isResourceOwner };

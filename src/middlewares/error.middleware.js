export const errorHandler = (err, req, res, next) => {

  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "El email ya existe",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ 
      success: false, 
      message: "El registro no existe" 
  });
  }
  if (err.code === "P2003") {
  return res .status(404).json({ 
    success: false, 
    message: "El usuario o el proyecto no existe" 
  });
}

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });

  



};
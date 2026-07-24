export const roleCheckMiddleware = (req,res,next) => {
  if(req.user.role.name === "admin") {
    next();
  }  else {
    resp.status(401).json({
      message:"Unauthorized, you don't have permission to access this api.",
    });
  }
};

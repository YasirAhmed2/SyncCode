// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface JwtPayload {
//   userId: string;
// }

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.cookies["AUTH_JWT"];
// //   
// console.log("Auth Header:", authHeader);
//   if (!authHeader ) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET!
//     ) as JwtPayload;

//     req.user = { id: decoded.userId };
//     console.log("Decoded JWT Payload:", decoded);
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt.utils.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["AUTH_JWT"];

  console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };

    req.user = { id: decoded.userId };
    console.log("Decoded payload:", decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

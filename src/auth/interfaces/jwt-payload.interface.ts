/**
 * Interface representing the payload of a JSON Web Token (JWT).
 * 
 * @swagger
 * components:
 *   schemas:
 *     JwtPayload:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user.
 *         name:
 *           type: string
 *           description: Full name of the user.
 *         email:
 *           type: string
 *           description: Email address of the user.
 */
export interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

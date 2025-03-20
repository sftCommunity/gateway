import { ValidRoles } from './valid-roles';

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the role.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the role, must be a valid role.
 *           example: "Admin"
 *         description:
 *           type: string
 *           description: A brief description of the role.
 *           example: "Administrator with full access rights."
 */
export interface Role {
  id: number;
  name: ValidRoles;
  description: string;
}

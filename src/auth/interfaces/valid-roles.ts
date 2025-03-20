/**
 * Enum representing valid roles within the authentication system.
 * 
 * @swagger
 * components:
 *   schemas:
 *     ValidRoles:
 *       type: string
 *       enum:
 *         - admin
 *         - user
 *         - super_admin
 */
export enum ValidRoles {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'super_admin',
}

export interface User {
  id: string;
  avatar: string;
  email: string;
  name: string;
  roles: string[];
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  authMethod: string;
}

export const parseUser = (user: any): User => {
  return {
    id: user.id,
    avatar: user.avatar,
    email: user.email,
    name: user.name,
    roles: user.roles,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    authMethod: user.authMethod,
  }
}
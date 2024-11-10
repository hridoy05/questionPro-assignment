declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
      session?:{
        jwt?: string
      }
    }
  }
}

export interface AuthPayload {
  userId: string;
  uId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number;
}

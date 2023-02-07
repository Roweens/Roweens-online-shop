import { User } from './User';

export type AuthSliceState = {
  user: User | null;
  IsAuth: boolean;
};

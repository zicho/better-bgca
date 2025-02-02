import type { User as BetterAuthUser } from 'better-auth';
import type { Insertable, Selectable, Updateable } from 'kysely';

export type User = Selectable<BetterAuthUser>;
export type NewUser = Insertable<BetterAuthUser>;
export type UserUpdate = Updateable<BetterAuthUser>;

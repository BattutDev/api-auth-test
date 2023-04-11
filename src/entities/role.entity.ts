import { Entity, PrimaryColumn } from 'typeorm';

export type RoleType = 'user' | 'premium' | 'moderator' | 'admin';

@Entity({
  name: 'roles',
})
export default class Role {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public name: RoleType;
}

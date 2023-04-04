import { Column, Entity, PrimaryColumn } from 'typeorm';

export type RoleType = 'user' | 'premium' | 'moderator' | 'admin' | 'root';

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

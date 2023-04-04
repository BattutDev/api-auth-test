import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Role, { RoleType } from './role.entity';

@Entity({
  name: 'users',
})
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public login: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public mail: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: false,
  })
  public firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
  })
  public lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public password: string;

  @Column({
    name: 'active',
    default: true,
    type: 'boolean',
  })
  public isActive: boolean;

  @OneToOne(() => Role, (role) => role.name, {
    eager: true,
  })
  @JoinColumn({
    referencedColumnName: 'name',
    name: 'role',
  })
  public role: Role;
}

export type SessionUserType = Omit<User, 'password'>;

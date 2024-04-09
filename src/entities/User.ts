import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './Event'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({type: 'text'})
  name: string

  @Column({type: 'text'})
  password: string

  @Column({type: 'text'})
  email: string

  // Um usuario tem muitos eventos
  @OneToMany(() => Event, event => event.user)
  event: Event[]
}
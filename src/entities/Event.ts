import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Video } from './Video'
import { User } from './User'
import { Image } from './Image'

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  date_id: number

  @Column({type: Date})
  date: Date // Vai receber um dia e hora

  @Column({type: 'text'})
  keyWord: string

  // aqui eu tenho que criar um relacionamento de um evento para muitas imagens e videos
  @OneToMany(() => Video, video => video.event)  // Estou criando aqui um relacionamento de muitos para um
  video: Video[] // Muitos videos para um evento

  @OneToMany(() => Image, image => image.event)  // Estou criando aqui um relacionamento de muitos para um
  image: Image[] // Muitos videos para um evento

  @ManyToOne(() => User, user => user.event)
  @JoinColumn({name: 'user_id'})
  user: User
}
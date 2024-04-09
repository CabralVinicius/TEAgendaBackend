import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
@Entity('videos')
export class Video{
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'}) // se eu quiser que essa coluna possa receber um nullo eu posso usar o nullable: true
  title: string

  @Column({ type: 'text'})
  url: string

  // aqui eu tenho que criar um relacionamento de muitos videos para uma data
  @ManyToOne(() => Event, event => event.video)
  @JoinColumn({name: 'event_id'})
  event: Event
}
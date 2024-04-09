import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
@Entity('images')// <- Nome da tabela que a classe Image vai mapear
export class Image {// Essa entidade vai mapear uma tabela [a Classe Image vai mapear a tabela images no BD]
  @PrimaryGeneratedColumn() // <- Cria um auto-incremento 
  id: number

  @Column({type: 'text'})
  name: string

  @Column({type: 'text'})
  keyWord: string

    // aqui eu tenho que criar um relacionamento de um evento para muitas imagens
  @ManyToOne(() => Event,  event => event.image)
  //@JoinColumn({name: 'image_id'})
   event: Event
}
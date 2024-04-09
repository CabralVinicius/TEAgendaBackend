import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')// <- Nome da tabela que a classe Image vai mapear
export class Image {// Essa entidade vai mapear uma tabela [a Classe Image vai mapear a tabela images no BD]
  @PrimaryGeneratedColumn() // <- Cria um auto-incremento 
  id: number

  @Column({type: 'text'})
  name: string

  @Column({type: 'text'})
  keyWord: string

    // aqui eu tenho que criar um relacionamento de um usuario para muitas datas

}
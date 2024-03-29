import {Entity, Column,OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { Report } from 'src/reports/report.entity'

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  email:string

  @Column()
  password:string

  @Column({default:true})
  admin:boolean

  @OneToMany(() => Report, (report) => report.user)
  porra: Report[];
}
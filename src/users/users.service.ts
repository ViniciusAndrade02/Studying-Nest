import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  create(email:string,password:string){
    const user = this.repo.create({email,password}) //instanciar primeiro

    return this.repo.save(user)
    
  }
 
  //buscar somente 1
  findOne(id:number){
    return this.repo.findOneBy({id})
  }

  findAll(){
    return this.repo.find()
  }

  //buscar todos email que possue o que foi digitado pelo "email"
  find(email:string){
    return this.repo.find( {where: {email}} )
  }

  async update(id: number, attrs:Partial<User>){
    const user = await this.findOne(id);
    if(!user){
      throw new Error('user not found')
    }
    Object.assign(user,attrs); //para copiar as propriedades do objeto attrs para o objeto user
    return this.repo.save(user)
  }

  async remove(id: number){
    const user = await this.findOne(id);
    if(!user){
      throw new Error('user not found')
    }
    return this.repo.remove(user)
  }

}


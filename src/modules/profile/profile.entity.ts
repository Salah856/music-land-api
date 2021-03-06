import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Gender } from '../../commons/enums/gender.enum';
import { User } from '../auth/entities/user.entity';
import { Favorite } from '../favorite/favorite.entity';

@Entity('profiles')
@Unique(['phone'])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: Gender;

  @Column()
  age: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({
    nullable: true
  })
  image: string;


  @OneToOne(type => User, user => user.profile, {
    eager: true
  })
  user: User;

  @OneToOne(type => Favorite, favorite => favorite.profile)
  @JoinColumn()
  favorite: Favorite;

  @Column()
  favoriteId: number;

}

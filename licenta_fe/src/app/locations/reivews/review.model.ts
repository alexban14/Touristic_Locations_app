import { LoginUser } from 'src/app/auth/user.model';

export class Review {
    public description: string;
    public rating: number;
    public author: LoginUser;

    constructor(descrption: string, rating: number, author: LoginUser) {
        (this.description = descrption), (this.rating = rating), (this.author = author);
    }
}

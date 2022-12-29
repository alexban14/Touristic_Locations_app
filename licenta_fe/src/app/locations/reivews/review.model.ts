import { LoginUser } from 'src/app/auth/user.model';

export class Review {
    public description: string;
    public rating: number;
    public creator: LoginUser;

    constructor(descrption: string, rating: number, creator: LoginUser) {
        (this.description = descrption), (this.rating = rating), (this.creator = creator);
    }
}

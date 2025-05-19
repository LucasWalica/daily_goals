export class UserAchievment{
    user:any;
    achievment:any; 
    date_earned:Date;
    constructor(user:any, achievment:any, date_earned:Date){
        this.user = user;
        this.achievment = achievment;
        this.date_earned = date_earned
    }
}
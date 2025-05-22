export class UserAchievment{
    user:any;
    achievement:Achievment; 
    date_earned:Date;
    constructor(user:any, achievement:Achievment, date_earned:Date){
        this.user = user;
        this.achievement = achievement;
        this.date_earned = date_earned
    }
}


export class Achievment{
    name:string;
    description:string;
    points_needed:number;
    icon:string; 
    constructor(name:string, description:string, points_needed:number, icon:string){
        this.name = name;
        this.description = description;
        this.points_needed = points_needed;
        this.icon = icon;
    }
}
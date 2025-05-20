import { Goal } from "./goal.models";


export class dailyGoalStatus {
    goal:Goal;
    date:any;
    completed:boolean;

    constructor(goal:Goal, date:any, completed:boolean){
        this.goal = goal;
        this.date = date; 
        this.completed = completed;
    }
}
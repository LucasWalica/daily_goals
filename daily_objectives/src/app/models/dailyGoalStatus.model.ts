import { Goal } from "./goal.models";


export class dailyGoalStatus {
    goal_details:Goal;
    date:any;
    completed:boolean;

    constructor(goal_details:Goal, date:any, completed:boolean){
        this.goal_details = goal_details;
        this.date = date; 
        this.completed = completed;
    }
}
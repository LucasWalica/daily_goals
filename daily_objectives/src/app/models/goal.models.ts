export class Goal {
    id:number;
    user: any;
    title: string;
    description: string;
    color: string;
    start_time: string | null;  // mejor usar string para tiempo tipo "HH:mm:ss"
    end_time: string | null;
  
    constructor(
      id:number,
      user: any,
      title: string,
      description: string,
      color: string,
      start_time: string | null,
      end_time: string | null
    ) {
      this.id=id;
      this.user = user;
      this.title = title;
      this.description = description;
      this.color = color;
      this.start_time = start_time;
      this.end_time = end_time;
    }
  }
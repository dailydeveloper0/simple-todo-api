export class Task {
  id: number;
  title: String;
  description: String;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;


  constructor(partial: Partial<Task>) {
    Object.assign(this, partial)
    this.id = Date.now() + Math.floor(Math.random()*1000);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.completed = this.completed || false
  }
}

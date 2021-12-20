export class Task {
  id?: number;
  completed: boolean;
  description: string;
  createdDate: Date;
  completedDate?: Date;

  constructor(
    id: number,
    completed: boolean,
    description: string,
    createdDate: Date,
    completedDate?: Date
  ) {
    this.id = id;
    this.completed = completed;
    this.description = description;
    this.createdDate = createdDate;
    this.completedDate = completedDate;
  }
}

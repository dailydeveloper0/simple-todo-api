import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  create(createTaskDto: CreateTaskDto): Task {
    const task = new Task(createTaskDto);
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    Object.assign(task, updateTaskDto);
    task.updatedAt = new Date();

    return task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(index, 1);

    return { message: `Task with ID ${id} deleted successfully` };
  }

  toggleComplete(id: number): Task {
    const task = this.findOne(id)
    task.completed = !task.completed
    task.updatedAt = new Date()
    return task
  }
}

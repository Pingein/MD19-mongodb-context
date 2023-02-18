import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

mongoose.set('strictQuery', false)
const PORT = 3000



const main = async () => {
  const app = express();
  app.use(bodyparser.json());
  app.use(cors({ origin: "*" }));

  await mongoose.connect('mongodb://localhost:27017/ToDoList')

  const toDoSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: {
      type: Date,
      default: Date.now()
    },
    isDone: {
      type: Boolean,
      default: false
    }
  }, {collection:"TODO"})
  toDoSchema.methods.markComplete = function markComplete() {
    this.isDone = true
  }

  const ToDo = mongoose.model('TODO', toDoSchema)


  const createTask = (title:string, content:string) => {
    const task = new ToDo({
      title,
      content,
    })
    return task
  }


  app.get("/tasks", (req: Request, res: Response) => {
    ToDo.find().then((data) => {
      res.send(data)
      console.log(data)
    })
  })

  app.post("/tasks", (req: Request, res: Response) => {
    const {title, content} = req.body

    if (!(title || content)) {
      return
    }

    const newTask = createTask(title, content)
    console.log(newTask)
    newTask.save()
  })


  app.listen(PORT, () => {
    console.log(`Application started on port ${PORT}!`);
  });
}


main()
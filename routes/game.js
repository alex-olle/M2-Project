const express = require("express");
const router = express.Router();

const Action = require("../models/action");
const Task = require("../models/task");
const User = require("../models/user");

//Route Profile/Dashboard GET

router.get("/profile", function (req, res, next) {
  const user = req.session.currentUser
  console.log(user)
  
  let today = new Date()
  console.log(today)
  // console.log(user._id)
  let userCreation = new Date(user.created_at);
  console.log(userCreation.getTime(), "here")
  let daysPassed = Math.floor((today.getTime() - userCreation.getTime())/86400000);
  console.log(daysPassed)
  res.render("profile", {user: user, daysPassed: daysPassed});
});

// Route Actions GET / POST (action completed, update of user)
router.get("/actions", async function (req, res, next) {
  const user = req.session.currentUser
  // console.log(user)
  const userActionPopulated = await User.findById(user._id).populate("actions");
  const actions = userActionPopulated.actions

  // console.log(actions);
  res.render("actions", { actions });
});

// Route action/:id GET
router.get("/actions/:id", async (req, res, next) => {
  try {
    
    const tasksList = await Action.findById(req.params.id).populate("tasks");

    res.render("tasks", { tasksList: tasksList });
  } catch (error) {
    console.log(error);
  }
});

router.post("/task/:id/delete", async (req, res, next) => {
  try {

    let task = await Task.findByIdAndRemove({_id: req.params.id});
    res.redirect('/actions')
    // res.redirect(`/actions/${actionId}`);
  } catch (error) {
    console.log(error);
  }
});

// Route task Post Task completed + update user
router.post("/task/:id/completed", async (req, res, next) => {
  try {
    console.log(req.params.id)
    // title  = req.body
    // console.log(title)
    const findTask = await Task.findById(req.params.id)
    console.log(findTask)


    const taskCompleted = await Task.findByIdAndUpdate({ _id : req.params.id}, {$set : {isCompleted : !findTask.isCompleted }}, {new: true} )

    // const experience = Task.findById
    res.redirect("/actions")
  } catch (error) {
    console.log(error)
  }
}
)
// Route action completed

// Route Task GET (new) POST
router.get("/:id/new", async (req, res, next) => {
  const tasksList = await Action.findById(req.params.id)
 
 res.render("new", {tasksList});
})

router.post("/:id/new", async (req, res, next) => {
  try {
    const actionId = req.params.id;
    const action = await Action.findById(actionId)
    console.log(actionId)
    const refAction = action.ref;
    console.log(refAction);
    const { title, experience, isPublic } = req.body;
    // console.log(title, experience, isPublic);
    const task = await new Task({ title, experience, isPublic, ref: refAction });
    const newTask = await task.save();

    await Action.update(
      { _id: actionId }, 
      { $push: { tasks: newTask } }
      )

    res.redirect(`/actions/${actionId}`);

  }
  catch (error) {
console.log(error)
  }
 });


// Route Task GET (edit) POST
router.get("/task/:id/edit", async (req, res, next) => {

  const task = await Task.findById(req.params.id)
  const taskRef = task.ref
  const actionRef = await Action.findOne( {ref : taskRef})
 
 res.render("edit", {task, actionRef});
})

router.post("/task/:id/edit", async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId)
    const taskRef = task.ref;
    // console.log(refAction);
    const { title, experience, isPublic } = req.body;
   
    await Task.update(
      { _id: taskId},
      { $set: { title, experience, isPublic}, },
      { new : true}
    )

    const actionRef = await Action.findOne( {ref : taskRef})
    const actionId = actionRef.id

    res.redirect(`/actions/${actionId}`);

  }
  catch (error) {
console.log(error)
  }
 });

module.exports = router;

# 

![readme](public/images/readme.png)

# SAVE YOUR DINO

## DESCRIPTION

Do you want to be greener but you don't know how to do it? Set yourself a bigger goal ! Save the dino from extinction (and maybe our own World from destruction) by achieving ecological actions in the real life. Set, edit and complete your own tasks that will enable you to complete the action, gain experience and level-up !

## USER STORIES

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **Profile** - As a user, I want to register my achievements so that I can see the dinos I saved, my experience, the days spent from the time I started to play, and my level in the game. 
- **Sign up** - As a user I want to sign up on the webpage so that I can see all the tasks that I could do to be more eco-friendly.
- **Login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **Actions list** - As a user I want to see all the actions available so that I can start being greener
- **Tasks list** - As a user I want to see all the tasks available so that I can start being greener step by step.
- **Create task** - As a user I want to create my own tasks so that I can contribute to save the planet.
- **Edit task** - As a user I want to edit tasks so that I can contribute to save the planet.
- **Delete task** - As a user I want to delete tasks.
- **Other page** - As a user I want to see the About, Attributions and FAQ pages, so that I can learn about the creators. And log out when I finished to play.

## BACKLOG

**Suggestion page** - As a user I want to see some suggestion tasks so that I can add them in my tasks list

**User update** - As a user I want my own tasks to be registered in my own page (not to be shared with everyone!)

## ROUTES:

| **Method** | **Route**          | **Description**                                              | Request - Body                                               |
| ---------- | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`      | `/`                | Main page route. Redirects to `login` view.                  |                                                              |
| `GET`      | `/login`           | Renders `login` form view.                                   |                                                              |
| `POST`     | `/login`           | Sends Login form data to the server and redirecto to Dashboard. | { email, password }                                          |
| `GET`      | `/signup`          | Renders `signup` form view.                                  |                                                              |
| `POST`     | `/signup`          | Sends Sign Up form to the server and creates user in the DB. | { name, email, password, country }                           |
| `GET`      | `/logout`          | Logs user out of the page. Redirect to the `login` view      |                                                              |
| `GET`      | `/profile`         | Private route. Renders `dashboad` view.                      |                                                              |
| `GET`      | `/actions`         | Private route. Renders `actions` view.                       |                                                              |
| `POST`     | `/actions`         | Private route. Sends if the user has completed an action to server and updates user in DB. Redirects to `actions`. | User model: { actions, experience, level }, Actions model: { completed } |
| `GET`      | `/modal`           | Private route. Render of the dinosaved by completing the action (before redirecting to action page.) |                                                              |
| `GET`      | `/actions/:id`     | Private route. Renders `tasks` view.                         |                                                              |
| `GET`      | `/task/new`        | Private route. Renders `new` view.                           |                                                              |
| `POST`     | `/task/new`        | Private route. Send the form data to the server and updates the DB. Redirect to `actions`. | Task model: { title, experience, isPublic }                  |
| `GET`      | `/task/edit/:id`   | Private route. Renders `edit` view.                          |                                                              |
| `POST`     | `/task/edit/:id`   | Private route. Send the form data to the server and updates the DB. Redirect to `actions`. | Task model: { title, experience, isPublic }                  |
| `POST`     | `/task/delete/:id` | Private route. Delete task from tasks lists. Redirects to `actions/:id`. |                                                              |



## MODELS

User

{

​    name: { type: String, required: true },

​    email: { type: String, required: true, unique: true },

​    password: { type: String, required: true },

​    level: {

​      type: [ Object ],

​      default: [

​        {

​          name: "Planetkiller",

​          img: "/images/planetkiller.png",

​        },

​        {

​          name: "Survivor",

​          img: "/images/survivor.png",

​        },

​        {

​          name: "Explorator",

​          img: "/images/explorador.png",

​        },

​        {

​          name: "Eco-Warrior",

​          img: "/images/eco-warrior.png",

​        },

​        {

​          name: "Planet Saviour",

​          img: "/images/planetsaviour.png", }]},



​    experience: { type: Number, default: 0 },

​    actions: [{ type: Schema.Types.ObjectId, ref: "Action" }],

​    // tasks: [ {type: Schema.Types.ObjectId, ref: "Task"}],

​    dinosaved: [{ type: Object }],

  },

  {

​    timestamps: {

​      createdAt: "created_at",

​      updatedAt: "updated_at",

​    } };

Actions

{

  title: String,

  experience: { type: Number, default: 20 },

  description: String,

  icon: String,

  isCompleted: { type: Boolean, default: false },

  allTasksCompleted: { type: Boolean, default: false },

  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],

  dino: {

​    name: String,

​    img: String,

​    isCompleted: { type: Boolean, default: false }

  },

  ref: Number,

};

Tasks

 {

​    title: { type: String , required: true },

​    isCompleted: {type : Boolean, default: false},

​    experience: { type: Number, required: true },

​    isPublic: { type: Boolean, required: true},

​    // actions:  {type: Schema.Types.ObjectId, ref: "Action"},

​    ref : Number  }

## LINKS

### Trello

[Trello Board](https://trello.com/b/FKpatjiD/module-02-project)

### Git

[GitHub Link](https://github.com/alex-olle/M2-Project)

[Deploy Link](https://save-your-dino.herokuapp.com/login)

### Presentation

[Presentation link](https://docs.google.com/presentation/d/1j6GdtUhGV-k4AXhZ7ZvMIT3Sye72l_1tyAzZTZiTbuo/edit?usp=sharing)

INTRO:

This is a simple task management application called Task Tracker. 
It will allow users to add, edit, complete, and delete tasks.
The goal is to help users manage their daily tasks efficiently.


FEATURES:  

Users can create new tasks with a title and due date.
Users can mark tasks as completed or delete them.
Users can filter tasks by 'All', 'Completed', or 'Pending'.
Users can edit existing tasks.


APP STRUCTURE:

HomePage Component: 
The main logic resides in the HomePage component. 
It will integrate the AddTaskForm, TaskList, EditTaskModal, and FilterButtons components, managing the app’s state with React's useState hook.

Component Breakdown:

AddTaskForm: Handles the creation of new tasks.
TaskList: Renders all tasks, passing each task to TaskItem.
TaskItem: Displays each individual task, providing buttons to complete, edit, or delete tasks.
FilterButtons: Allows users to filter tasks based on their status (completed or pending).

STATE MANAGEMENT:

Tasks State: The tasks state holds an array of task objects, each containing a title, due date, and completion status.
State Changes:

Adding Tasks: When a new task is added via the form, it updates the tasks state, which re-renders the TaskList.
Completing Tasks: Toggling the completion checkbox updates the task's completed property and reflects visually in the UI.
Editing Tasks: Opening the EditTaskModal allows the user to modify a task’s details and save changes back to the state.

USER CENTERED TESTING: 

I used Jest and React Testing Library to create tests based on the user’s perspective. Instead of just testing function calls, I focused on what users see and interact with after performing actions, such as task completion or deletion.
I wrote tests to verify that when a task is added, it appears in the task list.
I ensured that when a task is marked as completed, it visually updates with a line-through style.

CHALLENGES:

One challenge was efficiently managing state changes, especially when editing or deleting tasks.
I also struggled with finding a real meaning with testing. To me, it felt very redundant and more confusing than anything I've done before.

FUTURE IMPROVEMENTS: 

Adding task prioritization (e.g., high, medium, low).
Incorporating local storage or a database for task persistence.
Creating user authentication to manage tasks across different accounts.
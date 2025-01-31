const fs = require('fs');
const path = require('path');
const filepath = path.resolve(__dirname, 'todo', 'tasks.json');

const saveTasks = (tasks) => {
  // Ensure directory exists
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filepath, dataJSON);
}

const listTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filepath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const addTask = (task) => {
  const tasks = listTasks();  
  tasks.push({task});
  saveTasks(tasks);
  console.log('Task added', task);
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === 'add') {
  addTask(argument);
} else if (command === 'list') {
  console.log(listTasks());
} else if (command === 'remove') {
  removeTask(parseInt(argument));
} else {
  console.log('Invalid command');
}
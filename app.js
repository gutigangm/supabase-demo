const SUPABASE_URL = 'SUA_URL'
const SUPABASE_KEY = 'SUA_KEY'

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

const taskList = document.getElementById('taskList')

async function loadTasks() {

  const { data, error } = await client
    .from('tasks')
    .select('*')
    .order('id', { ascending: true })

  taskList.innerHTML = ''

  data.forEach(task => {

    const li = document.createElement('li')

    li.innerHTML = `
      ${task.title}
      <button onclick="deleteTask(${task.id})">
        X
      </button>
    `

    taskList.appendChild(li)
  })
}

async function addTask() {

  const input = document.getElementById('taskInput')

  if (!input.value) return

  await client
    .from('tasks')
    .insert([
      { title: input.value }
    ])

  input.value = ''

  loadTasks()
}

async function deleteTask(id) {

  await client
    .from('tasks')
    .delete()
    .eq('id', id)

  loadTasks()
}

loadTasks()

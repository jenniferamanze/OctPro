document.addEventListener('DOMContentLoaded', function () {
  var addBtn = document.getElementById('addTaskBtn');
  var myTasksTab = document.getElementById('myTasksTab');
  var aiTab = document.getElementById('aiTab');
  var addTaskModal = document.getElementById('addTaskModal');
  var closeModal = document.getElementById('closeModal');
  var cancelBtn = document.getElementById('cancelBtn');
  var taskForm = document.getElementById('taskForm');
  var tasksContainer = document.getElementById('tasksContainer');
  var emptyState = document.getElementById('emptyState');
  var activeCountEl = document.getElementById('activeCount');
  var completedCountEl = document.getElementById('completedCount');

  if (addBtn) {
    addBtn.addEventListener('click', function () {
      openModal();
    });
  }

  if (myTasksTab && aiTab) {
    myTasksTab.addEventListener('click', function () {
      myTasksTab.classList.add('active');
      aiTab.classList.remove('active');
    });

    aiTab.addEventListener('click', function () {
      aiTab.classList.add('active');
      myTasksTab.classList.remove('active');
      alert('AI Summary is coming soon!');
    });
  }

  // Logout button behavior (redirect to index)
  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Logout and return to login?')) {
        window.location.href = '../../index.html';
      }
    });
  }

  // --- tasks persisted with localStorage ---
  var STORAGE_KEY = 'octpro_tasks_v1';
  var tasks = loadTasks();

  function loadTasks() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function renderTasks() {
    // clear current items (but keep emptyState element present)
    // remove existing task-item nodes
    var existing = tasksContainer.querySelectorAll('.task-item');
    existing.forEach(function (n) { n.remove(); });

    if (!tasks.length) {
      emptyState.style.display = 'block';
      updateCounts();
      return;
    }

    emptyState.style.display = 'none';

    tasks.forEach(function (t) {
      var node = document.createElement('div');
      node.className = 'task-item';

      var left = document.createElement('div'); left.className = 'task-left';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!t.completed;
      checkbox.className = 'task-checkbox';
      checkbox.addEventListener('change', function () {
        t.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      var meta = document.createElement('div');
      var title = document.createElement('p'); title.className = 'task-title'; title.textContent = t.title;
      var desc = document.createElement('p'); desc.className = 'task-desc'; desc.textContent = t.description || '';

      meta.appendChild(title);
      if (t.description) meta.appendChild(desc);

      left.appendChild(checkbox);
      left.appendChild(meta);

      var actions = document.createElement('div'); actions.className = 'task-actions';
      var delBtn = document.createElement('button'); delBtn.className = 'btn-icon'; delBtn.title = 'Delete'; delBtn.innerHTML = '🗑️';
      delBtn.addEventListener('click', function () {
        if (confirm('Delete this task?')) {
          tasks = tasks.filter(function (x) { return x.id !== t.id; });
          saveTasks();
          renderTasks();
        }
      });

      actions.appendChild(delBtn);

      node.appendChild(left);
      node.appendChild(actions);
      tasksContainer.appendChild(node);
    });

    updateCounts();
  }

  function updateCounts() {
    var completed = tasks.filter(function (t) { return t.completed; }).length;
    var active = tasks.length - completed;
    if (activeCountEl) activeCountEl.textContent = active;
    if (completedCountEl) completedCountEl.textContent = completed;
  }

  function openModal() {
    if (addTaskModal) addTaskModal.classList.remove('hidden');
    // focus title
    setTimeout(function () { var f = document.getElementById('taskTitle'); if (f) f.focus(); }, 60);
  }

  function closeModalFn() {
    if (addTaskModal) addTaskModal.classList.add('hidden');
    if (taskForm) taskForm.reset();
  }

  if (closeModal) closeModal.addEventListener('click', closeModalFn);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModalFn);
  if (addTaskModal) addTaskModal.addEventListener('click', function (e) { if (e.target === addTaskModal.querySelector('.modal-backdrop')) closeModalFn(); });

  if (taskForm) {
    taskForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = (document.getElementById('taskTitle') || {}).value || '';
      var description = (document.getElementById('taskDesc') || {}).value || '';
      if (!title.trim()) return alert('Please enter a task title');

      var newTask = { id: Date.now(), title: title.trim(), description: description.trim(), completed: false, createdAt: new Date().toISOString() };
      tasks.unshift(newTask);
      saveTasks();
      renderTasks();
      closeModalFn();
    });
  }

  // initial render
  renderTasks();
});
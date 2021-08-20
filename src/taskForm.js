import { projects, createTask } from "./data.js";
import { recalcTaskNumber } from "./navMenu.js";
import { setProgressDisplay } from "./project.js";
import { createTaskLi, handleDeleteTask } from "./taskListItem.js";
import { createElemAttr, formatDate, focusAtEnd, isDueDateToday } from "./helpers.js";
import flatpickr from "flatpickr";

function createTaskForm(viewType, project, task) {
  const taskFormId = task ? "edit-task-form" : "new-task-form";
  const taskForm = createElemAttr("form", { id: taskFormId });

  const flexWrapper = createElemAttr("div", { class: "flex-wrapper" });
  taskForm.appendChild(flexWrapper);

  // Create check button
  const completeValue = task && task.complete ? "1" : "";
  const btnCheck = createElemAttr("button", {
    type: "button",
    value: completeValue,
    "aria-label": "toggle-complete",
    class: "btn-check",
    "data-class": "checked",
  });
  if (completeValue) btnCheck.classList.add("checked");
  btnCheck.appendChild(createElemAttr("i", { class: "fas fa-check" }));
  flexWrapper.appendChild(btnCheck);

  // Create title input
  const inputTitleId = task ? "edit-title" : "new-title";
  const inputTitleValue = task ? task.title : "";

  const labelTitle = createElemAttr("label", {
    for: inputTitleId,
    class: "visuallyhidden",
  });
  labelTitle.textContent = "Task title";
  flexWrapper.appendChild(labelTitle);

  const inputTitle = createElemAttr("input", {
    type: "text",
    id: inputTitleId,
    class: "task-title",
    required: "",
    value: inputTitleValue,
    placeholder: "Task name",
  });
  flexWrapper.appendChild(inputTitle);

  // Create priority button
  const priorityValue = task && task.priority ? "1" : "";
  const btnPriority = createElemAttr("button", {
    type: "button",
    value: priorityValue,
    "aria-label": "set-priority",
    class: "task-option",
    "data-class": "active",
  });
  if (priorityValue) btnPriority.classList.add("active");
  btnPriority.appendChild(createElemAttr("i", { class: "fas fa-flag" }));
  flexWrapper.appendChild(btnPriority);

  // Create notes input
  const inputNotesId = task ? "edit-notes" : "new-notes";
  const inputNotesValue = task ? task.notes : "";

  const labelNotes = createElemAttr("label", {
    for: inputNotesId,
    class: "visuallyhidden",
  });
  labelNotes.textContent = "Task notes";
  taskForm.appendChild(labelNotes);

  const inputNotes = createElemAttr("textarea", {
    class: "task-notes",
    id: inputNotesId,
    placeholder: "Notes",
    rows: "2",
  });
  inputNotes.textContent = inputNotesValue;
  taskForm.appendChild(inputNotes);

  // Create form options
  const formOptions = createElemAttr("div", { class: "form-options" });
  taskForm.appendChild(formOptions);

  // - Create date picker
  const datePicker = createElemAttr("div", { class: "flatpickr" });
  formOptions.appendChild(datePicker);

  const btnCalendar = createElemAttr("button", {
    type: "button",
    title: "toggle",
    "data-toggle": "",
    "aria-label": "toggle-calendar",
    class: "input-button",
  });
  btnCalendar.appendChild(createElemAttr("i", { class: "far fa-calendar-alt" }));
  datePicker.appendChild(btnCalendar);

  const inputDateId = task ? "edit-date" : "new-date";
  const labelDate = createElemAttr("label", { for: inputDateId, class: "visuallyhidden" });
  labelDate.textContent = "When";
  datePicker.appendChild(labelDate);

  const inputDate = createElemAttr("input", { type: "text", placeholder: "When", "data-input": "" });
  datePicker.appendChild(inputDate);

  const btnClearDate = createElemAttr("button", {
    type: "button",
    title: "clear",
    "data-clear": "",
    "aria-label": "clear-date",
    class: "input-button",
  });
  btnClearDate.appendChild(createElemAttr("i", { class: "fas fa-times" }));
  datePicker.appendChild(btnClearDate);

  // - Initialize flatpickr instance
  const initialDate = task ? task.dueDate 
      : viewType === 'today' ? 'today' 
      : null;
  initFlatpickr(datePicker, inputDateId, initialDate);

  // - Create project selection menu
  const taskProjectWrapper = createElemAttr("div", {
    class: "task-project-wrapper",
  });
  formOptions.appendChild(taskProjectWrapper);

  const selectProjectId = task ? "edit-task-project" : "new-task-project";
  const labelProject = createElemAttr("label", {
    for: selectProjectId,
    class: "visuallyhidden",
  });
  labelProject.textContent = "Select a project";
  taskProjectWrapper.appendChild(labelProject);

  const selectProject = createElemAttr("select", { class: "task-project", id: selectProjectId });
  taskProjectWrapper.appendChild(selectProject);

  projects.list.forEach((proj) => {
    const option = createElemAttr("option", { value: proj.id });
    option.textContent = proj.title;
    if (project && project.id === proj.id) option.setAttribute("selected", "");
    selectProject.appendChild(option);
  });

  // Create form control buttons
  const btnFormWrapper = createElemAttr("div", { class: "btn-form-wrapper" });
  taskForm.appendChild(btnFormWrapper);

  const btnSubmit = createElemAttr("button", { type: "submit", class: "btn-form btn-submit" });
  btnSubmit.textContent = "Save";
  btnFormWrapper.appendChild(btnSubmit);

  const btnCancel = createElemAttr("button", { type: "button", class: "btn-form btn-cancel" });
  btnCancel.textContent = "Cancel";
  btnFormWrapper.appendChild(btnCancel);

  // Add event listeners
  btnCheck.addEventListener("click", toggleTaskState);

  btnPriority.addEventListener("click", toggleTaskState);

  btnCancel.addEventListener("click", () => handleCancel(taskForm, project, task));

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (task) editTask(taskForm, task, project, viewType);
    else createNewTask(taskForm, project);
  });

  return taskForm;
}

function initFlatpickr(element, id, initialDate) {
  flatpickr(element, {
    disableMobile: "true",
    altInput: true,
    altFormat: "M j Y",
    dateFormat: "M j Y",
    defaultDate: initialDate,
    wrap: true,
    onReady: (a, b, fp) => {
      fp.altInput.setAttribute("id", id);
    },
    onChange: (selDates, dateStr, fp) => {
      fp.altInput.value = formatDate(dateStr).date;
    },
  });
}

function toggleTaskForm() {
  const taskFormWrapper = document.getElementById("task-form-wrapper");
  if (taskFormWrapper.classList.contains("show-form")) {
    taskFormWrapper.classList.remove("show-form", "edit-mode");
    document.querySelector(".form-overlay").classList.remove("show");
  } else {
    taskFormWrapper.classList.add("show-form", "edit-mode");
    focusAtEnd(taskFormWrapper.querySelector(".task-title"));
    document.querySelector(".form-overlay").classList.add("show");
  }
}

function toggleTaskState() {
  if (this.value) {
    this.value = "";
    this.classList.remove(this.dataset.class);
  } else {
    this.value = "1";
    this.classList.add(this.dataset.class);
  }
}

function handleCancel(form, project, task) {
  if (task) {
    form.parentNode.replaceWith(createTaskLi(task, project));
    document.querySelector(".form-overlay").classList.remove("show");
  } else {
    toggleTaskForm();
    resetForm(form);
  }
}

function resetForm(form) {
  const btnPriority = form.querySelector(".task-option");
  const btnCheck = form.querySelector(".btn-check");
  if (btnPriority.value) toggleTaskState.apply(btnPriority);
  if (btnCheck.value) toggleTaskState.apply(btnCheck);
  form.reset();
}

function createNewTask(form, project) {
  const title = form.querySelector(".task-title").value;
  const notes = form.querySelector(".task-notes").value;
  const dueDate = form.querySelector(".flatpickr-input").value;
  const btnPriority = form.querySelector(".task-option");
  const priority = btnPriority.value;
  const btnCheck = form.querySelector(".btn-check");
  const complete = btnCheck.value;

  const newProjectId = form.querySelector(".task-project").value;
  const newProject = projects.list.find(
    (currProject) => currProject.id === newProjectId
  );

  const task = createTask(title, notes, dueDate, priority, complete);

  newProject.addTask(task);
  recalcTaskNumber(newProject);

  const taskList = document.querySelector(".task-list");
  // Today view case
  if (!project && isDueDateToday(dueDate)) {
    taskList.appendChild(createTaskLi(task, newProject, 'today'));
    setProgressDisplay(projects.findTodayTasks());
  // Project view case
  } else if (project && newProjectId === project.id) {
    taskList.appendChild(createTaskLi(task, project, 'project'));
    setProgressDisplay(project);
  }
  if (isDueDateToday(dueDate)) recalcTaskNumber(projects.findTodayTasks());
  toggleTaskForm();
  resetForm(form);
}

function editTask(form, task, project, viewType) {
  const prevDate = task.dueDate;

  task.title = form.querySelector(".task-title").value;
  task.notes = form.querySelector(".task-notes").value;
  task.dueDate = form.querySelector(".flatpickr-input").value;
  task.priority = form.querySelector(".task-option").value ? true : false;
  task.complete = form.querySelector(".btn-check").value ? true : false;

  const newProjectId = form.querySelector(".task-project").value;
  const newProject = projects.list.find(
    (currProject) => currProject.id === newProjectId
  );

  if (viewType === "project") {
    if (newProjectId === project.id) {
      form.parentNode.replaceWith(createTaskLi(task, project, "project"));
      setProgressDisplay(project);
    } else {
      handleDeleteTask(task, project, form.parentNode);
      newProject.addTask(task);
    }
    recalcTaskNumber(newProject);
    if (isDueDateToday(prevDate) || isDueDateToday(task.dueDate)) {
      recalcTaskNumber(projects.findTodayTasks());
    }
  } else if (viewType === "today") {
    if (newProjectId !== project.id) {
      handleDeleteTask(task, project);
      newProject.addTask(task);
    }
    if (!isDueDateToday(task.dueDate)) {
      form.parentNode.remove();
    } else {
      form.parentNode.replaceWith(createTaskLi(task, newProject, "today"));
      setProgressDisplay(projects.findTodayTasks());
    }
    recalcTaskNumber(newProject);
    recalcTaskNumber(projects.findTodayTasks());
  }
  document.querySelector(".form-overlay").classList.remove("show");
}

export { createTaskForm, toggleTaskForm };

function countProgress(project) {
  let completed = 0;
  project.tasks.forEach(task => {
    if (task.complete) completed++;
  });
  const progress = Math.round(completed / project.tasks.length * 100);
  return progress;
}

export { countProgress };
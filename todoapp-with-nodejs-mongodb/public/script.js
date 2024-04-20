const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tastsからタスクを読み込む
const showTasks = async () => {
    try {
        //自作のAPIを叩く
        const { data: tasks } = await axios.get("/api/v1/tasks");
        //タスクが１つもないとき
        if (tasks.length < 1) {
          tasksDOM.innerHTML = '<h5 class="empty-list">タスクがありません</h5>';
          loadingDOM.style.visibility = "hidden";
          return;
        }
        // console.log(tasks);
    
        //タスクを出力
        const allTasks = tasks
          .map((task) => {
            //console.log(task.name);
            const { completed, _id: taskID, name } = task;
    
            return `<div class="single-task ${completed && "task-completed"}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
        <div class="task-links">
    
        <!-- edit link -->
        <a href="edit.html?id=${taskID}"  class="edit-link">
           <i class="fas fa-edit"></i>
        </a>
    
        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
        </button>
        </div>
        </div>`;
          })
          .join("");
        tasksDOM.innerHTML = allTasks;
      } catch (err) {
        tasksDOM.innerHTML =
          '<h5 class="empty-list">エラーです。もう一度やり直してください</h5>';
      }
};

showTasks();

// タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDOM.value;
    try {
        await axios.post("/api/v1/tasks", { name: name });
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました。";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。"
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if (element.classList.contains("delete-btn")) {
        const id = element.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});
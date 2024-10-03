import React, { useEffect, useState } from "react";
import Block from "../Block";
import TaskItem from "./TaskItem";
import "./index.css";
import { useFetchTasksQuery } from "./store/tasksApi";
import { useUser } from "../../../app/providers/UserProvider";
import { useTranslation } from "react-i18next";

interface Task {
  id: number;
  title: string;
  description: string;
  amount: number;
  icon: string;
  link: string;
}

const Tasks: React.FC = () => {
  const user = useUser();
  const { t } = useTranslation();
  const [shouldFetchTasks, setShouldFetchTasks] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [animateContainer, setAnimateContainer] = useState(false);

  useEffect(() => {
    if (user) {
      setShouldFetchTasks(true);
    }
  }, [user]);

  const { data: tasks = [], isLoading } = useFetchTasksQuery(undefined, {
    skip: !shouldFetchTasks,
  });

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks.length > 0) {
      const completedTaskIds =
        user?.account?.completedTasks?.map((task) => task.id) || [];
      const newFilteredTasks = tasks.filter(
        (task) => !completedTaskIds.includes(task.id),
      );
      setFilteredTasks(newFilteredTasks);
    }
  }, [tasks, user?.account?.completedTasks]);

  useEffect(() => {
    if (filteredTasks.length > 0) {
      setAnimateContainer(true);
    }
  }, [filteredTasks]);

  const handleViewMore = () => {
    setShowAllTasks(!showAllTasks);
  };

  const schedulerTask: Task = {
    id: 0,
    title: "Загрузка...",
    description: "Пожалуйста, подождите, пока задачи загружаются.",
    amount: 0,
    icon: "src/shared/assets/loading-icon.svg",
    link: "#",
  };

  return (
    <Block className="task-block">
      <div className="tasks-section">
        <h3>{t("Tasks")}</h3>
        <div
          className={`tasks-container ${animateContainer ? "animated" : ""} ${showAllTasks ? "expanded" : ""}`}
        >
          {isLoading ? (
            <TaskItem
              key={schedulerTask.id}
              id={schedulerTask.id}
              title={schedulerTask.title}
              description={schedulerTask.description}
              reward={schedulerTask.amount}
              iconSrc={schedulerTask.icon}
              buttonText="Загрузка..."
              link={schedulerTask.link}
            />
          ) : (
            filteredTasks
              .slice(0, showAllTasks ? filteredTasks.length : 3)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  reward={task.amount}
                  iconSrc={task.icon}
                  buttonText={t("Follow")}
                  link={task.link}
                />
              ))
          )}
        </div>
      </div>
      {filteredTasks.length > 3 && (
        <div className="view-more-section">
          <div className="view-more-block">
            <button className="view-more-btn" onClick={handleViewMore}>
              {showAllTasks ? t("view_less") : t("view_more")}
            </button>
            <img src="src/shared/assets/chevron.svg" alt="" />
          </div>
        </div>
      )}
    </Block>
  );
};

export default Tasks;

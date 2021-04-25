import React from 'react';
import SplashScreen from 'react-native-splash-screen';
type TaskResult = [string, any];
export type Task = () => Promise<TaskResult | null>;

export interface ApplicationLoaderProps {
  tasks?: Task[];
  initialConfig?: Record<string, any>;
  children: (config: any) => React.ReactElement;
}

/**
 * Loads application configuration and returns content of the application when done.
 *
 * @property {Task[]} tasks - Array of tasks to prepare application before it's loaded.
 * A single task should return a Promise with value and a by which this value is accessible.
 *
 * @property {any} fallback - Fallback configuration that is used as default application configuration.
 * May be useful at first run.
 *
 * @property {(props: { loaded: boolean }) => React.ReactElement} placeholder - Element to render
 * while application is loading.
 *
 * @property {(result: any) => React.ReactElement} children - Should return Application component
 */
export const AppLoading = (
  props: ApplicationLoaderProps,
): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const loadingResult = props.initialConfig || {};

  const onTasksFinish = (): void => {
    setLoading(false);
    console.log(
      'hiding splash screen, but we should probably check a few more user properties e.g new notifications, feed items etc',
    );
    SplashScreen.hide();
  };

  React.useEffect(() => {
    if (loading) {
      startTasks().then(onTasksFinish);
    }
  }, [loading]);

  const saveTaskResult = (result: [string, any] | null): void => {
    if (result) {
      loadingResult[result[0]] = result[1];
    }
  };

  const createRunnableTask = (task: Task): Promise<void> => {
    // console.log("THE TASK", props.tasks)

    return task().then(saveTaskResult);
  };

  const startTasks = async (): Promise<any> => {
    if (props.tasks) {
      return Promise.all(props.tasks.map(createRunnableTask));
    }
    return Promise.resolve();
  };

  return (
    <React.Fragment>{!loading && props.children(loadingResult)}</React.Fragment>
  );
};

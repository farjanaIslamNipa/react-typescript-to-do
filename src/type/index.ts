export type TTaskStatus = 'to-do' | 'in-progress' | 'done'
export type TTaskPriority = 'high' | 'medium' | 'low'

export type TTask = {
  id: string;
  name: string;
  priority: TTaskPriority | '';
  status: TTaskStatus
}
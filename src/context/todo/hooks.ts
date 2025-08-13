import { useContext } from 'react';
import { TodoActionContext, TodoStateContext } from './TodoProvider';

export function useTodoState() {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error('state 가 없어요');
  }
  return state;
}
// 액션 전용 context 사용
export function useTodoActions() {
  const actions = useContext(TodoActionContext);
  if (!actions) {
    throw new Error('action 이 없어요');
  }
  return actions;
}

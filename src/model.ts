// import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { atom, selector } from "recoil";

const todoListState = atom<any>({
	key: "todoListState",
	default: [],
});

const todoListFilterState = atom({
	key: "todoListFilterState",
	default: "Show All",
});

const filteredTodoListState = selector({
	key: "filteredTodoListState",
	get: ({ get }) => {
		const filter = get(todoListFilterState);
		const list = get(todoListState);

		switch (filter) {
			case "Show Completed":
				return list.filter((item: any) => item.isComplete);
			case "Show Uncompleted":
				return list.filter((item: any) => !item.isComplete);
			default:
				return list;
		}
	},
});

const todoListStatsState = selector({
	key: "todoListStatsState",
	get: ({ get }) => {
		const todoList = get(todoListState);
		const totalNum = todoList.length;
		const totalCompletedNum = todoList.filter((item: any) => item.isComplete)
			.length;
		const totalUncompletedNum = totalNum - totalCompletedNum;
		const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

		return {
			totalNum,
			totalCompletedNum,
			totalUncompletedNum,
			percentCompleted,
		};
	},
});

export {
	filteredTodoListState,
	todoListFilterState,
	todoListState,
	todoListStatsState,
};

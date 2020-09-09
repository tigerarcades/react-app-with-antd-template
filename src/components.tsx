import React, { useState } from "react";
import { Divider } from "antd";
import {
	filteredTodoListState,
	todoListState,
	todoListFilterState,
	todoListStatsState,
} from "./model";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { replaceItemAtIndex, removeItemAtIndex, getId } from "./utils";

const TodoItem = ({ item }: { item: any }) => {
	const [todoList, setTodoList] = useRecoilState(todoListState);
	const index = todoList.findIndex((listItem: any) => listItem === item);

	const editItemText = ({ target: { value } }: { target: any }) => {
		setTodoList(
			replaceItemAtIndex(todoList, index, {
				...item,
				text: value,
			})
		);
	};

	const toggleItemCompletion = () => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			isComplete: !item.isComplete,
		});

		setTodoList(newList);
	};

	const deleteItem = () => {
		setTodoList(removeItemAtIndex(todoList, index));
	};

	return (
		<div>
			<input type="text" value={item.text} onChange={editItemText} />
			<input
				type="checkbox"
				checked={item.isComplete}
				onChange={toggleItemCompletion}
			/>
			<button onClick={deleteItem}>X</button>
		</div>
	);
};

const TodoItemCreator = () => {
	const [inputValue, setInputValue] = useState("");
	const setTodoList = useSetRecoilState(todoListState);

	const addItem = () => {
		setTodoList((oldTodoList: any) => [
			...oldTodoList,
			{
				id: getId(),
				text: inputValue,
				isComplete: false,
			},
		]);
		setInputValue("");
	};

	const onChange = ({ target: { value } }: { target: any }) => {
		setInputValue(value);
	};

	return (
		<div>
			<input type="text" value={inputValue} onChange={onChange} />
			<button onClick={addItem}>Add</button>
		</div>
	);
};

const TodoListFilters = () => {
	const [filter, setFilter] = useRecoilState(todoListFilterState);

	const updateFilter = ({ target: { value } }: { target: any }) => {
		setFilter(value);
	};

	return (
		<>
			Filter:
			<select value={filter} onChange={updateFilter}>
				<option value="Show All">All</option>
				<option value="Show Completed">Completed</option>
				<option value="Show Uncompleted">Uncompleted</option>
			</select>
		</>
	);
};

const TodoListStats = () => {
	const {
		totalNum,
		totalCompletedNum,
		totalUncompletedNum,
		percentCompleted,
	} = useRecoilValue(todoListStatsState);

	const formattedPercentCompleted = Math.round(percentCompleted * 100);

	return (
		<ul>
			<li>Total items: {totalNum}</li>
			<li>Items completed: {totalCompletedNum}</li>
			<li>Items not completed: {totalUncompletedNum}</li>
			<li>Percent completed: {formattedPercentCompleted}</li>
		</ul>
	);
};

const TodoList = () => {
	const todoList = useRecoilValue(filteredTodoListState);

	return (
		<>
			<TodoListStats />
			<Divider />
			<TodoListFilters />
			<Divider />
			<TodoItemCreator />
			<Divider />

			{todoList.map((todoItem: any) => (
				<TodoItem key={todoItem.id} item={todoItem} />
			))}
		</>
	);
};

export { TodoList };

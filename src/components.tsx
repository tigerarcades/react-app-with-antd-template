import React, { useState } from "react";
import { Divider, Table } from "antd";
import { todoListState } from "./model";
import {
	atom,
	selector,
	useRecoilState,
	useSetRecoilState,
	useRecoilValue,
} from "recoil";
import { replaceItemAtIndex, removeItemAtIndex, getId } from "./utils";

interface ColumnDescriptor {
	name: string;
	dataIndex: string;
}

const columns: ColumnDescriptor[] = [{ name: "Text", dataIndex: "text" }];

/**
 *
 * @param param0
 */
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

const TodoList = () => {
	const todoList = useRecoilValue(todoListState);

	return (
		<>
			{/* <TodoListStats /> */}
			{/* <TodoListFilters /> */}
			<TodoItemCreator />

			{todoList.map((todoItem: any) => (
				<TodoItem key={todoItem.id} item={todoItem} />
			))}
		</>
	);
};

export { TodoItem, TodoList };

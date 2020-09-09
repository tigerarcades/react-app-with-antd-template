// import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { atom } from "recoil";

const todoListState = atom<any>({
	key: "todoListState",
	default: [],
});

export { todoListState };

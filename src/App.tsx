import React from "react";
import { Layout } from "antd";
import { TodoList } from "./components";
import "./App.less";

const { Header, Footer, Content } = Layout;

const App = () => {
	return (
		<div className="App">
			<Layout>
				<Header></Header>
				<Content>
					<TodoList />
				</Content>
				<Footer></Footer>
			</Layout>
		</div>
	);
};

export default App;

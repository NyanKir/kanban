import React from "react";
import ReactDOM from "react-dom";
import initalData from "./inital-data"
import Column from "./components/column";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initalData
    }

    render() {
        return (

            this.state.columnOrder.map((columnId) => {
                const column = this.state.columns[columnId];
                const tasks = column.tasksIDs.map((taskId) => this.state.tasks[taskId])
                return <Column tasks={tasks} column={column} key={columnId}/>
            })
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
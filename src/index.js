import React from "react";
import ReactDOM from "react-dom";
import {DragDropContext} from "react-beautiful-dnd";
import initalData from "./inital-data"
import Column from "./components/column";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initalData
        this.onDragEnd=this.onDragEnd.bind(this)
    }

    //Обработчик падения
    onDragEnd = result => {


        const {destination, source, draggableId} = result;
        console.log({destination, source, draggableId})

        if(!destination){
            return
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }
        const column =this.state.columns[source.droppableId];
        const newTaskIds =Array.from(column.tasksIDs);
        newTaskIds.splice(source.index,1);
        newTaskIds.splice(destination.index, 0,draggableId);

        const newColumn={
            ...column,
            tasksIDs: newTaskIds,
        }
        const newState={
            ...this.state,
            columns:{
                ...this.state.columns,
                [newColumn.id]:newColumn,
            },
        }
        this.setState(newState)

    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {
                    this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.tasksIDs.map((taskId) => this.state.tasks[taskId])
                        return <Column tasks={tasks} column={column} key={columnId}/>
                    })
                }
            </DragDropContext>

        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
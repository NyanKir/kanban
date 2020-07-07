import React from "react";
import ReactDOM from "react-dom";
import {DragDropContext} from "react-beautiful-dnd";
import initalData from "./inital-data"
import styled from "styled-components";
import Column from "./components/column";

const Container=styled.div`
    display:flex;
`

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

        const start =this.state.columns[source.droppableId];
        const finish =this.state.columns[destination.droppableId];

        if(start=== finish){
            const newTaskIds =Array.from(start.tasksIDs);
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index, 0,draggableId);

            const newColumn={
                ...start,
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
            return;
        }
    // Moving from one list to another

        const startTaskIds=Array.from(start.tasksIDs);
        startTaskIds.splice(source.index,1)
        const newStart={
            ...start,
            tasksIDs: startTaskIds,
        };

        const finishTaskIds=Array.from(finish.tasksIDs);
        finishTaskIds.splice(destination.index,0, draggableId);
        const newFinish={
            ...finish,
            tasksIDs: finishTaskIds,
        };

        const newState={
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]:newStart,
                [newFinish.id]:newFinish,
            }
        }

        this.setState(newState)
        return;

    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>

                {
                    this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.tasksIDs.map((taskId) => this.state.tasks[taskId])
                        return <Column tasks={tasks} column={column} key={columnId}/>
                    })
                }

                </Container>
            </DragDropContext>

        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
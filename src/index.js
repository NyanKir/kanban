import React from "react";
import ReactDOM from "react-dom";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import initalData from "./inital-data"
import styled from "styled-components";
import Column from "./components/column";
import Button from "./components/button";
import "./style/index.scss";


const Container = styled.div`
    display:flex;
`
const Wrapper =styled.div`
    display:flex;
    font-family: Roboto,-apple-system,BlinkMacSystemFont,sans-serif;
    
`
const AddColumnWrapper=styled.div`
    max-width: 300px;
    min-width: 300px;
    background: #cfcfcf;
    border-radius: 2px;
    height: fit-content;
`


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initalData
        this.onDragEnd = this.onDragEnd.bind(this)
        this.addNewTask = this.addNewTask.bind(this)
        this.removeColumn = this.removeColumn.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this.addColumn = this.addColumn.bind(this)
    }
    addColumn(column,value){
        if(!value){
            return true;
        }
        this.setState((state)=>{
            const columnOrder=state.columnOrder;
            let idColumn, column={};
            if(columnOrder.length !==0){
                idColumn=`columns-${parseFloat(columnOrder.slice(-1)[0].slice(-1))+1}`;
            }else{
                idColumn='columns-1';
            }
            columnOrder.push(idColumn)
            column[idColumn]={
                id:idColumn,
                title:value,
                tasksIDs:[],
            }
            return{
                ...state,
                columns:{
                    ...state.columns,
                    ...column
                },
                columnOrder: columnOrder,
            }
        })
    }
    //Удаление колонны
    removeColumn(column,index){
        delete this.state.columns[column.id];
        this.state.columnOrder.splice(index,1)
        this.setState({
            ...this.state
        })
    }

    //Удаление задания
    removeTask(task,column,index){
        this.setState((state)=>{

            const tasks=state.tasks;
            delete tasks[task.id]
            column.tasksIDs.splice(index,1)
            return{
                ...state,
                columns:{
                    ...state.columns,
                    column
                }
            }
        })
    }

    //Обработчик добавления задания
    addNewTask=(column,value)=>{
        if(!value){
            return true;
        }

        let task;
        const lastTask=Object.keys(this.state.tasks).slice(-1)[0];
        if(lastTask=== undefined){
            task =`task-1`;
        }else{
            task=`task-${parseInt(lastTask[lastTask.length-1])+1}`;

        }
        const listTasks =this.state.tasks;
        const listColumns =this.state.columns;

        listTasks[task]={id:task,content:value}
        column.tasksIDs.push(task)
        listColumns[column.id]=column
        const newState={
            ...this.state,
            tasks:listTasks,
            columns:listColumns

        }
        this.setState(newState)
    }

    //Обработчик падения
    onDragEnd = result => {

        const {destination, source, draggableId,type} = result;
        console.log({destination, source, draggableId})

        if (!destination) {
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        //If moving column
        if(type==="column"){
            const newColumnOrder=Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index,1);
            newColumnOrder.splice(destination.index,0,draggableId);

            const newState={
                ...this.state,
                columnOrder: newColumnOrder
            }
            this.setState(newState);
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.tasksIDs);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                tasksIDs: newTaskIds,
            }
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            }
            this.setState(newState)
            return;
        }


        // Moving from one list to another
        const startTaskIds = Array.from(start.tasksIDs);
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            tasksIDs: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.tasksIDs);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            tasksIDs: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        }

        this.setState(newState)

    }

    render() {
        return (
            <Wrapper>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="all-columns" direction="horizontal" type="column">
                        {
                            (provided) => (
                                <Container {...provided.droppableProps} ref={provided.innerRef}>

                                    {
                                        this.state.columnOrder.map((columnId, index) => {
                                            const column = this.state.columns[columnId];
                                            const tasks = column.tasksIDs.map((taskId) => this.state.tasks[taskId])
                                            return <Column
                                                tasks={tasks}
                                                column={column}
                                                key={columnId}
                                                index={index}
                                                addNewTask={this.addNewTask}
                                                removeTask={this.removeTask}
                                                removeColumn={this.removeColumn}
                                            />
                                        })
                                    }

                                    {provided.placeholder}
                                </Container>
                            )
                        }

                    </Droppable>
                </DragDropContext>
                <AddColumnWrapper>
                    <Button addNewTask={this.addColumn} column={true}/>
                </AddColumnWrapper>
            </Wrapper>


        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
import React from "react";
import styled from "styled-components";
import Task from "./task";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Button from "./button";

const Container = styled.div`
white-space: pre;
    transition:background-color .3s ease;
    background-color: #cfcfcf;
    height: fit-content;
    max-width: 300px;
    width: 300px;
    margin: 0px 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title = styled.div`
    padding:8px;
    display: flex;
    justify-content:space-between
`;
const Tasks = styled.div`
    overflow-y:scroll;
    max-height:70vh;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    transition: background-color .2s ease;
    background-color: ${props=>(props.isDraggingOver)? 'skyblue':'white'};
`;
export const Close=styled.span`
    cursor:pointer;
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size:34px;    
    transition:.3s; 
    height: ${props=> props.primary ? 'auto':'20px'};
    

    &:hover{
        transition:.3s;
        color:palevioletred;
    }
`;


export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided)=>(
                    <Container {...provided.draggableProps} ref={provided.innerRef}>
                        <Title {...provided.dragHandleProps}>
                            <h3>{this.props.column.title}</h3>
                            <Close onClick={()=>this.props.removeColumn(this.props.column,this.props.index)} primary>&#215;</Close>
                        </Title>

                        <Droppable droppableId={this.props.column.id} type="mask">
                            {(provided,snapshot) =>
                                (
                                    <Tasks ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                                        {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} removeTask={this.props.removeTask} column={this.props.column}/>)}
                                        {provided.placeholder}
                                    </Tasks>
                                )}
                        </Droppable>
                        <Button addNewTask={this.props.addNewTask} column={this.props.column}/>
                    </Container>
                )}
            </Draggable>

        )
    }
}

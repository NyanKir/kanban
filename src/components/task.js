import React from "react";
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import {Close} from "./column";

const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    border: 1px solid lightgray;
    margin-bottom: 9px;
    padding: 8px;
    background-color: ${props=>(props.isDragging)? 'lightgreen':'white'};
`;
export default class Task extends React.Component {
    render() {

        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {
                    (provided, snapshot)=>(
                        <Container {...provided.draggableProps}
                                   {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                            <span>{this.props.task.content}</span>
                            <Close onClick={()=>this.props.removeTask(this.props.task,this.props.column,this.props.index)}>&#215;</Close>
                        </Container>
                    )
                }

            </Draggable>
        )
    }
}
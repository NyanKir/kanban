import React from "react";
import styled from "styled-components";

const Container=styled.div`
    display: flex;
    align-items:center;
    padding:8px;
    cursor:pointer;
    &:hover{
        transition:.3s ease;
        background-color:#b0b0b0;
    }
`
const Plus=styled.div`
  display:inline-block;
  width:25px;
  height:25px;
  margin-right: 5px;
  background:
    linear-gradient(#000,#000),
    linear-gradient(#000,#000),
    transparent;
  background-position:center;
  background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
  background-repeat:no-repeat;
`

// class Form  extends React.Component{
//     render() {
//         return (
//
//         );
//     }
// }

export  default class Button extends React.Component{
    render() {
        return (
            <Container onClick={()=>this.props.addNewTask(this.props.column)}>
                <Plus/>
                <span>Добавить задание</span>
            </Container>
        );
    }
}
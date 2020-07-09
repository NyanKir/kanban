import React from "react";
import styled from "styled-components";
import Form from "./form";

const Container = styled.div`
    display: flex;
    align-items:center;
    padding:8px;
    cursor:pointer;
    &:hover{
        transition:.3s ease;
        background-color:#b0b0b0;
    }
`
const Plus = styled.div`
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


export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false}
        this.changeShow=this.changeShow.bind(this)
    }

    changeShow(){
        this.setState({showForm:!this.state.showForm})
    }

    render() {
        return (
            (this.state.showForm)
                ? <Form addNewTask={this.props.addNewTask} column={this.props.column} changeShow={this.changeShow}/>
                :
                <Container onClick={() => this.changeShow()}>
                    <Plus/>
                    <span>Добавить задание</span>
                </Container>

        );
    }
}
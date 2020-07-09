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
const Plus=styled.span`
    height: 25px;
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size:34px
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
                    <Plus>&#43;</Plus>
                    <span>Добавить задание</span>
                </Container>

        );
    }
}
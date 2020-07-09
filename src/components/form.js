import React from "react";
import styled from "styled-components";

const Container = styled.div`
        padding:8px;
`;
const StyledTextarea = styled.textarea`
    width: -webkit-fill-available;
    resize: vertical;
    border: 1px solid lightgrey;
    border-radius: 2px;
    outline:none;
    box-shadow: 0 0 5px ${props=> props.error? "red" : "#00abfa"};

`
const ButtonPosition=styled.div`
    margin-top: 3px;
    justify-content: space-between;
    display: flex;
`
const Button=styled.div`
    border-radius: 2px;
    padding: 5px 15px;
    background: ${props=>props.primary ? "lightgreen": "palevioletred"};
    cursor:pointer;
     
`
export  default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state={value:'',error:false}
        this.handleChange=this.handleChange.bind(this);
        this.handlerTextarea=this.handlerTextarea.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handlerTextarea(){
        const result = this.props.addNewTask(this.props.column,this.state.value);
        if(result){
            this.setState({error: true});
        }else {
            this.setState({error: false});
            this.props.changeShow()
        }
    }
    render() {
        return (
            <Container>
                <StyledTextarea value={this.state.value} onChange={this.handleChange} error={this.state.error}/>
                <ButtonPosition>
                    <Button primary onClick={()=> this.handlerTextarea()}>Готово</Button>
                    <Button onClick={()=> this.props.changeShow()}>Отмена</Button>
                </ButtonPosition>
            </Container>
        );
    }
}
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 9px;
    padding: 8px;
`;
export default class Task extends React.Component {
    render() {
        return (
            <Container>
                {this.props.content}
            </Container>
        )
    }
}
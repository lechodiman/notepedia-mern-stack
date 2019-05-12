import React, { Component } from "react";
import { Button } from 'reactstrap';

const NotePost = props => {

    return (
        <div>
            <div>
                <h4>{props.title}</h4>
                <div>{props.description}</div>
                <Button color="primary">Clap</Button>
                <i class="far fa-heart"></i>
            </div>
        </div>
    )

}

export default NotePost;

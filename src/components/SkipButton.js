import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class SkipButton extends React.Component
    {
        constructor( props )
        {
            super( props );
			this.state = {
                		
            }
			
        }
		
        render()
        {
            return <Button
            className="button btn-sm btn-dark"
            onClick={ () => { this.props.onButtonPress(); } }
            >
                Vogel überspringen
            </Button>;
        }
    }
    export default SkipButton;

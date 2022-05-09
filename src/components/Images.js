
import React, { Component } from "react";
import ImageView from "./ImageView";


class Images extends React.Component {
    /***************************************************************************************************************
    *   Initializes this component by setting the initial state.
    *
    *   @param {Object} props The initial properties being passed in the component tag.
    ***************************************************************************************************************/


    constructor(props) {
        super(props);
        this.state = {

        }

    }

    /***************************************************************************************************************
    *   Being invoked every time this component renders.
    *
    *   @return {JSXTransformer} The rendered JSX.
    ***************************************************************************************************************/
    render() {
        console.log("Images.render() being invoked");
        if (this.props.imageList != 0) {
            let index = this.props.imageIndex;

            let imagePfad = this.props.imageList[index].path;

            return (
                <ImageView
                    path={imagePfad}
                />
            );

        }
        else {
            return <div></div>
        }

    }




}
export default Images;


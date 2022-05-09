import React, { Component } from "react";
 
import Image from "react-bootstrap/Image";

class ImageView extends React.Component
{  
  constructor( props )
  {
      super( props );
      this.state = {}
      
  }

  render()
  {
     
     return( 

        <img src={this.props.path} class="rounded img-fluid" alt="image not found"/>

     );

  }
  

  

}
export default ImageView;
import React, { Component } from "react";

import { Link } from "react-router-dom";

import LevelSelectionPreview from "./LevelSelectionPreview"

import "../App.css";
import "../index.css";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

import ImageView from "./ImageView";


class Menu extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state = {
          errMsg1: "",
          errMsg2: "",
          errMsg3: ""              
        }
        
    }
    
    render()
    {
        return (
          <div class="text-center mb-2">

            <div class="col my-5">

            <p className="Handwritten">{this.props.appTitle}</p>

            <p className="NormalText">
              Wähle ein Level und teste dein Wissen über verschiedene Vögel rund
              um den Globus. Viel Spaß!
            </p>
            </div>

            <LevelSelectionPreview 
            levelNumber="1"
            errorMessage={this.props.errorMessage1}
            imagePath="./images/level_banner/Banner_Deutschland.png"
            description="Amsel, Drossel, Fink und Star - Kennst du die ganze Vogelschar? Im ersten Level geht es darum, die häufigsten Vögel aus Deutschland zu erkennen. Von der kleinen Bachstelze bis zum großen Storch; ist die Vogelwelt nicht vielfältig?"
            onButtonPress={this.props.onButtonPress}/>

            <LevelSelectionPreview 
            levelNumber={2}
            errorMessage={this.props.errorMessage2}
            imagePath="./images/level_banner/Banner_Regenwald.png"
            description="Die tropischen Regenwälder sind bekannt für ihre Vielfalt an bunt schimmernden Gestalten, ob Insekten, Amphibien, oder auch Säugetiere. Hier sind natürlich die Vögel interessant, und auch hier fehlt es nicht an ausgefallenen Farben und Formen."
            onButtonPress={this.props.onButtonPress}/>  

            <LevelSelectionPreview 
            levelNumber={3}
            errorMessage={this.props.errorMessage3}
            imagePath="./images/level_banner/Banner_Antarktis.png"
            description="Kalt und trostlos wird es ab dem 60. südlichen Breitengrad. Doch davon lassen sich unsere gefiederten Freunde nicht abhalten. Nur 35 Vogelarten brüten in der Antarktis, doch zu finden sind zwischen den kalten Klippen und Eisbergen weitaus mehr Arten."
            onButtonPress={this.props.onButtonPress}/>  

            <Link to='/edit' claaName="linkPath">
              Level bearbeiten
            </Link>
           
          </div>
        );
    }

    componentDidMount() {

      this.setState({
        errMsg3: this.props.errorMessage3
      })
  
    }

}
export default Menu;

 
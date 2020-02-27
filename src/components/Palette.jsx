import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "../style/Palette.css";
import Navbar from "../components/NavBar";
import PaletteFooter from "./PaletteFooter";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
  }

  changeLevel = level => {
    console.log(level);
    this.setState({ level });
  };

  changeFormat = val => {
    this.setState({ format: val });
  };

  render() {
    const { level, format } = this.state;
    const { colors, paletteName, emoji, id } = this.props.palette;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Palette;

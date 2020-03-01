import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import { generatePalette } from "./components/ColorHelper";
import seedColors from "./components/seedColors";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: seedColors };
  }
  findPalette = id => {
    return this.state.palettes.find(palette => {
      return palette.id === id;
    });
  };

  savePalette = newPalette => {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={routeProps => (
              <NewPaletteForm
                savePalette={this.savePalette}
                palettesList={this.state.palettes}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={routeProps => (
              <PaletteList palettes={this.state.palettes} {...routeProps} />
            )}
          />
          <Route
            exact
            path="/palette/:id"
            render={routeProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={routeProps => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

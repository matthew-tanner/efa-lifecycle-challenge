import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      showPoke: false,
      timer: 10,
      intervalId: 0,
    };
  }

  startCountdown() {
    this.setState({ timer: 10, intervalId: 0 });
    const newIntervalId = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState((oldState) => {
          return {
            ...oldState,
            timer: oldState.timer - 1,
          };
        });
      } else {
        clearInterval(this.state.intervalId);
      }
    }, 1000);

    this.setState((oldState) => {
      return {
        ...oldState,
        intervalId: newIntervalId,
      };
    });
  }

  fetchPokemon() {
    clearInterval(this.state.intervalId);
    this.startCountdown();
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className={"wrapper"}>
        <button className={"start"} onClick={() => this.fetchPokemon()}>
          Start!
        </button>
        <h1 className={"timer"}>Timer Display</h1>
        <h3>{this.state.timer}</h3>
        <div className={"pokeWrap"}>
          <img
            className={this.state.timer === 0 ? "pokeImg" : "pokeHidden"}
            src={this.state.pokeSprite}
            alt="imageshere"
          />
          <h1 className={"pokeName"}>{this.state.timer === 0 ? this.state.pokeName : <></>}</h1>
        </div>
      </div>
    );
  }
}

export default PokeFetch;

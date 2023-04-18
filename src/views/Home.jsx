/** @format */

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import { userService } from "../services/user.service";
import AtomLoader from "../cmps/AtomLoader.jsx";
// import { SvgIcon } from '../cmps/SvgIcon'
import { cryptoService } from "../services/crypto.service";
import Particles from 'react-particles'
import { MovesList } from '../cmps/MovesList'
import { MovePreview } from '../cmps/MovePreview'

export class Home extends Component {
  state = {
    user: null,
    coins: null,
    animatedName: null,
    letters: "abcdefghijklmnopqrstuvwxyz",
  };

  async componentDidMount() {
    try {
      const user = userService.getUser();
      const coins = await cryptoService.getRate(user.coins);
      this.setState({ coins, user, animatedName: user.name }, () =>
        this.animateName()
      );
    } catch (error) {
      console.log("error:", error);
    }
  }

  setCoins = async () => {
    const coins = await cryptoService.getRate(this.state.user.coins);
    this.setState({ coins });
  };

  animateName = () => {
    let { animatedName } = this.state;
    const iterations = 4;
    for (let i = 0; i < animatedName.length; i++) {
      for (let j = iterations; j > 0; j--) {
        setTimeout(() => {
          let currWord = animatedName
            .split("")
            .map((letter, idx) => {
              if (idx <= j) {
                return animatedName[idx];
              }
              return this.state.letters[Math.floor(Math.random() * 26)];
            })
            .join("");
          if (i === animatedName.length - 1) currWord = this.state.user.name;
          this.setState({ animatedName: currWord });
        }, i * j * 30);
      }
    }
  };

  render() {
    const { user, coins, animatedName } = this.state;
    if (!user || !coins) return <AtomLoader />;
    return (
      <section className="home">
        <div className="user-card">
          <h2>Hey {user.name}!</h2>
          <div className="user-data">
            <div className="coins">
              <span className="coins-icon">
                <FontAwesomeIcon
                  icon={faCoins}
                  style={{ color: "#fcff47" }}
                />
              </span>
              <span className="user-balance">: {user.coins}</span>
            </div>
            <div className="coins bit-coin">
              <span className="coins-icon">
                <FontAwesomeIcon
                  icon={faBitcoinSign}
                  style={{ color: "#fff81f" }}
                />
              </span>
              <span className="user-balance">
                : {coins || "(Getting Number...)"}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

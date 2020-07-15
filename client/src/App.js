import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import { render } from 'react-dom';
// import Data from "./Data"

const unsplash = new Unsplash({
  accessKey:"U2SE5vPtSLO0Mq163QBMM4t4GxahTwC99CzfvJLYavo",
  secret:"W765JFE2FA2r7RcEVnzqB0SNnUVsFo7SKU4rnInUExs",
  callbackUrl: "https://api.unsplash.com/"
})


class App extends Component {
    constructor(){
      super()
      this.state = {
        loading: false,
        data:'',
        search: "surfing"
      }
      this.input = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
      console.log("up here:", this.state)
      const posts = 1
      const pageNum = Math.floor(Math.random() * 100)
      const search = this.state.search
      const orientation = {orientation: "landscape"}
      
      unsplash.search.photos(search , pageNum , posts , orientation)
        .then(res => res.json())
        .then(json => {
          console.log("json:", json)
          this.setState({
          data:json
          })
        })
        .catch(err => console.log(err))
    }

    getPictures(){
      const data = this.state.data.results
      if(typeof data !== "undefined"){
        const newData = data.map((pic)=>{
          document.querySelector("body").style.backgroundImage = `url(${pic.urls.full})`
          return (
            <div className="artistDiv">
              <div>{`Photographer: ${pic.user.first_name} ${pic.user.last_name}`}</div>
              <div>{`Instagram: ${pic.user.instagram_username}`}</div>
            </div>
          ) 
        })
        return newData } else return null
    }

    handleSubmit(event){
      event.preventDefault()
      console.log(this.input.current.value)
      this.setState({
        search:`${this.input.current.value}`
      })
      setTimeout(()=> this.componentDidMount(), 1000)
      return true
      
    }

    blinkInput(){
      const blinkInputs = [
        ...document.querySelectorAll("[data-module='blink-input']")
      ];
    
      blinkInputs.forEach(function(input) {
        const elInput = input.querySelector("[data-module='blink-input-el']");
        const inputCursor = input.querySelector(
          "[data-module='blink-input-cursor']"
        );
        const inputText = input.querySelector("[data-module='blink-input-text']");
        const inputTextShort = input.querySelector(
          "[data-module='blink-input-text-short']"
        );
        const inputWarning = input.querySelector(
          "[data-module='blink-input-warning']"
        );
        let inputActive;
    
        const findPosition = function(isDelete) {
          let textArray = [];
    
          for (let i = 0; i < elInput.selectionStart; i++) {
            textArray.push(elInput.value[i]);
          }
    
          elInput.selectionStart = textArray.length;
          inputTextShort.innerText = textArray.join("");
    
          inputCursor.setAttribute(
            "style",
            `left: ${inputTextShort.clientWidth}px`
          );
        };
    
        elInput.addEventListener("focusout", () =>
          inputCursor.setAttribute("style", `left: 0`)
        );
    
        elInput.addEventListener("click", findPosition);
    
        input.addEventListener("keyup", function(event) {
          const charCode = event.which || event.keyCode;
          const charStr = String.fromCharCode(charCode);
    
          if (charCode === 8) {
            findPosition("isDelete");
          }
    
          if (!/[a-z0-9]/i.test(charStr) || charCode !== 32) {
            inputActive = true;
            findPosition();
          }
        });
      });
    }

    render(){

      this.blinkInput();

      return (
        <div>
          {this.getPictures()}
          <form onSubmit={this.handleSubmit} className="field">
            <div className="input-group">
              <label for="input-1" data-module="blink-input"> 
                <input className="input" ref={this.input} id="input-1" placeholder="Random Picture Search" data-module="blink-input-el"/>
                <div className="input-after" data-module="blink-input-cursor"></div>
                <div className="input-text" data-module="blink-input-text"></div>
                <div className="input-text-short" data-module="blink-input-text-short"></div>
              </label>
            </div> 
            {/* <label>
              Search:
              <input type="text" ref={this.input} className="search"/>
            </label>
            <input type="submit" value="Submit" /> */}
          </form>
        </div>
      )
    }
}



export default App;

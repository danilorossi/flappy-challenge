import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery.transit';
import * as GameStates from '../../globals/gameStates';

const GRAVITY = 0.25;
const JUMP = -4.6;
const DEFAULT_PIPE_HEIGHT = 140;
const PIPE_WIDTH = 52;

class Game extends Component {

  velocity = 0;
  position = 180;
  rotation = 0;
  flyArea = 0;
  pipes = [];
  //loops
  loopGameloop = null;
  loopPipeloop = null;

  state = {
    score: 0,
    pipeheight: DEFAULT_PIPE_HEIGHT
  }

  updatePlayer = (player) => {
     //rotation
     this.rotation = Math.min((this.velocity / 10) * 90, 90);

     //apply rotation and position
     $(player).css({ rotate: this.rotation, top: this.position });
  }

  componentWillReceiveProps(nextProps) {
      const nextGameState = nextProps.gameState;
      const gameState = this.props.gameState;
      if( gameState === 100 && nextGameState === 0) {
         $("#splash").transition({ opacity: 1 }, 1000, 'ease');
        $(document).on("mousedown", this.screenClick);
        $(document).keydown((e) => {
           if(e.keyCode === 32) {
             this.screenClick();
           }
        });
      } else if ( gameState === 1 && nextGameState === 2) {
        $(document).off("mousedown", this.screenClick);
        $(document).keydown(null);
      } else if ( gameState === 2 && nextGameState === 100) {
          this.showSplash();
      }
  }

  componentDidMount() {
    this.flyArea = $("#flyarea").height();
    this.showSplash()
  }

  gameloop = () => {
     var player = $("#player");

     const { pipeheight } = this.state;

     //update the player speed/position
     this.velocity += GRAVITY;
     this.position += this.velocity;

     //update the player
     this.updatePlayer(player);

     //create the bounding box
     var box = document.getElementById('player').getBoundingClientRect();
     var origwidth = 34.0;
     var origheight = 24.0;

     var boxwidth = origwidth - (Math.sin(Math.abs(this.rotation) / 90) * 8);
     var boxheight = (origheight + box.height) / 2;
     var boxleft = ((box.width - boxwidth) / 2) + box.left;
     var boxtop = ((box.height - boxheight) / 2) + box.top;
     var boxright = boxleft + boxwidth;
     var boxbottom = boxtop + boxheight;


     //did we hit the ground?
     if(box.bottom >= $("#land").offset().top)
     {
        this.playerDead();
        return;
     }

     //have they tried to escape through the ceiling? :o
     var ceiling = $("#ceiling");
     if(boxtop <= (ceiling.offset().top + ceiling.height()))
        this.position = 0;

     //we can't go any further without a pipe
     if(this.pipes[0] == null)
        return;



     //determine the bounding box of the next pipes inner area
     var nextPipe = this.pipes[0];

     var nextpipeupper = nextPipe.children(".pipe_upper");

     var pipetop = nextpipeupper.offset().top + nextpipeupper.height();
     var pipeleft = nextpipeupper.offset().left - 2; // for some reason it starts at the inner pipes offset, not the outer pipes.


     var piperight = pipeleft + PIPE_WIDTH;
     var pipebottom = pipetop + pipeheight;


     //have we gotten inside the pipe yet?
     if(boxright > pipeleft)
     {
        //we're within the pipe, have we passed between upper and lower pipes?
        if(boxtop > pipetop && boxbottom < pipebottom)
        {
           //yeah! we're within bounds

        }
        else
        {
           //no! we touched the pipe
           this.playerDead();
           return;
        }
     }


     //have we passed the imminent danger?
     if(boxleft > piperight)
     {
        //yes, remove it
        this.pipes.splice(0, 1);

        //and score a point
        this.playerScore();
     }
  }

  startGame = () => {

     this.props.onStartGame();

     //fade out the splash
     $("#splash").stop();
     $("#splash").transition({ opacity: 0 }, 500, 'ease');

     //start up our loops
     var updaterate = 1000.0 / 60.0 ; //60 times a second
     this.loopGameloop = setInterval(this.gameloop, updaterate);
     this.loopPipeloop = setInterval(this.updatePipes, 1400);

     //jump from the start!
     this.playerJump();
  }

  screenClick = () => {
      const {
        gameState
      } = this.props;

     if(gameState === GameStates.PLAYING) {
        this.playerJump();
     }
     else if(gameState === GameStates.SPLASH_SCREEN) {
        this.startGame();
     }
  }

  showSplash = () => {
     //set the defaults (again)
     this.velocity = 0;
     this.position = 180;
     this.rotation = 0;

     this.setState({
       score: 0,
       pipeheight: DEFAULT_PIPE_HEIGHT
     })

     //update the player in preparation for the next game
     $("#player").css({ y: 0, x: 0});
     this.updatePlayer($("#player"));

     //clear out all the pipes if there are any
     $(".pipe").remove();
     this.pipes = [];

     //make everything animated again
     $(".animated").css('animation-play-state', 'running');
     $(".animated").css('-webkit-animation-play-state', 'running');
  }

  playerJump = () => {
     this.velocity = JUMP;
  }

  playerScore = () => {
     const nextScore = this.state.score + 1;
     this.setState({
       score: nextScore
     })
     this.props.onScoreUpdate(nextScore);
  }
  updatePipes = () => {

     const nextPipeHeight = this.state.pipeheight - 2;

     this.setState({
       pipeheight: nextPipeHeight
     })
     //Do any pipes need removal?
     $(".pipe").filter(function() { return $(this).position().left <= -100; }).remove()

     //add a new pipe (top height + bottom height  + pipeheight == flyArea) and put it in our tracker
     var padding = 80;
     var constraint = this.flyArea - nextPipeHeight - (padding * 2); //double padding (for top and bottom)
     var topheight = Math.floor((Math.random()*constraint) + padding); //add lower padding
     var bottomheight = (this.flyArea - nextPipeHeight) - topheight;
     var newpipe = $('<div class="pipe animated"><div class="pipe_upper" style="height: ' + topheight + 'px;"></div><div class="pipe_lower" style="height: ' + bottomheight + 'px;"></div></div>');
     $("#flyarea").append(newpipe);

     this.pipes.push(newpipe);
  }

  playerDead = () => {

     //stop animating everything!
     $(".animated").css('animation-play-state', 'paused');
     $(".animated").css('-webkit-animation-play-state', 'paused');

     //drop the bird to the floor
     var playerbottom = $("#player").position().top + $("#player").width(); //we use width because he'll be rotated 90 deg
     var floor = this.flyArea;
     var movey = Math.max(0, floor - playerbottom);
     $("#player").transition({ y: movey + 'px', rotate: 90}, 1000, 'easeInOutCubic');

     //destroy our gameloops
     clearInterval(this.loopGameloop);
     clearInterval(this.loopPipeloop);
     this.loopGameloop = null;
     this.loopPipeloop = null;

     this.props.onEndGame()
  }

  render() {
    return (
      <div>
        {this.props.currentGame.twitterUsername && this.props.currentGame.playing &&
          <h3 style={{ color: 'black'}}>Now playing: {this.props.currentGame.twitterUsername}</h3>
        }

         <div id="gamecontainer">
             <div id="gamescreen">
              <div id="sky" className="animated">
                 <div id="flyarea">
                    <div id="ceiling" className="animated"></div>
                    <div id="player" className="bird animated"></div>
                    <div id="splash"></div>
                 </div>
              </div>
              <div id="land" className="animated"><div id="debug"></div></div>
           </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    gameState: state.currentGame.status,
    currentGame: state.currentGame,
    finalPostion: state.stats.scores.findIndex(score => score.twitterUsername === state.currentGame.twitterUsername),
    totalScoresCount: state.stats.scores.length
  };
}

export default connect (
  mapStateToProps,
  // mapDispatchToProps
)(Game);

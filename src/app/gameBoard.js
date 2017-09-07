import React from "react";
import ReactDOM from "react-dom";
const css = require('./app.Sass')

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

var redList=[];
var greenList=[];

class Board extends React.Component
{
  constructor(){
    super();
    this.state={gSize: 1040, generation:0, timerInterval:"", gStatus:'off'}
    ;}

  gridSize(val){
    console.log(" Selected Grid Size: "+val);
    this.setState({gSize:val});
  }
  renderArray(arrayVal,index){
    var cellId = "id"+index;
    if (this.state.gSize == 2340){
    return(<div ref={cellId} onClick={()=>
        this.refs[cellId].style.background = "white"} className='unitTwo'></div>)}
    else if(this.state.gSize == 4160){
    return(<div ref={cellId} onClick={()=>this.refs[cellId].style.background = "white"} className='unitThree'></div>)}
    else
    return(<div ref={cellId} onClick={()=>this.refs[cellId].style.background = "white"} className='unitOne'></div>)
 }
  drawer(squares)
    {
    var unit=[];
    for(var y = 0; y < squares; y++){
          unit[y]="v"+y;
          }
    return unit;
  }
  clearGrid(){
     for(var p=0;p<this.state.gSize;p++)
    {
       this.refs['id'+p].style.background = "blue";
    }
  this.setState({generation:0});
  }

startGame()
  {
var whiteSquares=[]; var randomId=0; var tempVal = ''; var distance = 6;
var min = Math.floor(Math.random()* (Math.floor((this.state.gSize))));
var max = Math.floor(Math.random()*(this.state.gSize - (min+1)) + (min+1));

for(var p=0;p<this.state.gSize;p++)
    {
       this.refs['id'+p].style.background = "blue";
    }
    for(var i=0;i<=(max-min);)
    {
      randomId = Math.floor(Math.random()*(max - min) + min);
      if((whiteSquares.indexOf(!("id"+randomId))) || ((whiteSquares.indexOf(("id"+(randomId - 1 )))) & (whiteSquares.indexOf(("id"+(randomId + 1 ))))))
      {
      whiteSquares[i]="id"+randomId; i+=distance;}
      else
        i--;
    }
    for(var k=0;k<whiteSquares.length;)
    {
      this.refs[whiteSquares[k]].style.background = "white";
      k+=distance;
    }
 this.setState({generation:0, gStaus:'on'});
}

birthCell()
  {
      //console.log("birthCell method started");
      var borderSquare = this.state.gSize;
      var borderCell = 0; var startCell=[];
      if(this.state.gSize == 1040){borderCell = 40;}
      else if(this.state.gSize== 2340){borderCell = 60;}
      else if(this.state.gSize == 4160){borderCell = 80;}

for(var i =0;i<this.state.gSize;i++)
     {

if(((((i%borderCell))-1)>=0) && (((i%borderCell)+1)<borderCell) && ((i+1*(borderCell))<this.state.gSize) && ((i-1*borderCell)>0))
  this.cellInCenter(i);
else if((i+borderCell)>this.state.gSize)
  this.cellOnBottom(i);
else if(((((i%borderCell))-1)==-1))
  this.cellInLeft(i);
else if((((i%borderCell)))==(borderCell-1))
  this.cellInRight(i);
else if((i-borderCell)<0)
  this.cellOnTop(i);
    }
   }


cellInCenter(cell)
  {
 var borderCell = 0; var startCell=[];
      if(this.state.gSize == 1040){borderCell = 40;}
      else if(this.state.gSize== 2340){borderCell = 60;}
      else if(this.state.gSize == 4160){borderCell = 80;}
var neighbours=[(cell-1),(cell+borderCell-1),(cell+borderCell),(cell+borderCell+1),(cell+1),(cell-borderCell+1),(cell-borderCell),(cell-borderCell-1)];

this.greenCell(neighbours,cell);
  }

greenCell(neighbours,cell)
    {
      var whiteCounter=0; var nei=[];
      var cellColor=''; var neiColor=''; var newVal = this.state.generation;

      for(var i=0;i<neighbours.length;i++)
       {
      neiColor = (this.refs['id'+neighbours[i]].style.background).split(' ')[0];
      if(neiColor==='white' || neiColor==="red")
       {
         whiteCounter=whiteCounter + 1;
         if(neiColor == 'red')
           redList.push(neighbours[i]);
         nei.push(neighbours[i]);
         //console.log("nei color: id"+neighbours[i]+"-> "+(this.refs['id'+neighbours[i]].style.background).split(' ')[0]);
       }
      }
     cellColor = (this.refs['id'+cell].style.background).split(' ')[0];

     if(cellColor==='white')
     {
     if((whiteCounter<2) || (whiteCounter > 3))
     this.refs['id'+cell].style.background = "red";
     }
     if((whiteCounter === 3))
      {
     if(cellColor==='blue')
      {
     this.refs['id'+cell].style.background = "green";
     greenList.push(cell);
     //console.log(" Cell "+cell+" comes to life, with neighbours:"+nei);
      }
     for(var q=0;q<nei.length;q++)
     this.refs['id'+nei[q]].style.background = "white";
     }

    if(cell==(this.state.gSize-1)){
       for(var t=0;t<redList.length;t++)
       this.refs['id'+redList[t]].style.background = "blue";

      for(var u=0;u<greenList.length;u++)
      this.refs['id'+greenList[u]].style.background = "white";
        redList=[];greenList=[];
        this.setState({generation: (newVal+1)});
      }

  }


cellInLeft(cell)
  {
   var borderCell = 0; var startCell=[];
      if(this.state.gSize == 1040){borderCell = 40;}
      else if(this.state.gSize== 2340){borderCell = 60;}
      else if(this.state.gSize == 4160){borderCell = 80;}
  var neighbours =[];
  //console.log("In Left "+neighbours);
  if(cell == 0)
    neighbours = [(cell+borderCell),(cell+borderCell+1),(cell+1)];
  else if(cell == (this.state.gSize-borderCell))
    neighbours = [(cell-borderCell),(cell-borderCell+1),(cell+1)];
  else
    neighbours= [(cell+borderCell),(cell-borderCell),(cell+borderCell+1),(cell+1),(cell-borderCell+1)];
  this.greenCell(neighbours,cell);
  }
cellInRight(cell)
  {
   var borderCell = 0; var startCell=[];
      if(this.state.gSize == 1040){borderCell = 40;}
      else if(this.state.gSize== 2340){borderCell = 60;}
      else if(this.state.gSize == 4160){borderCell = 80;}
  var neighbours=[(cell-1),(cell+borderCell-1),(cell+borderCell),(cell-borderCell),(cell-borderCell-1)];
  //console.log("Cell in Right");
  if(cell == (borderCell-1))
    neighbours=[(cell-1),(cell+borderCell-1),(cell+borderCell)];
  else if(cell == this.state.gSize-1)
  neighbours=[(cell-1),(cell-borderCell-1),(cell-borderCell)];
  this.greenCell(neighbours,cell);
  }

cellOnTop(cell)
  {
  var borderCell = 0; var startCell=[];
      if(this.state.gSize == 1040){borderCell = 40;}
      else if(this.state.gSize== 2340){borderCell = 60;}
      else if(this.state.gSize == 4160){borderCell = 80;}
 var neighbours=[(cell+1),(cell-1),(cell+borderCell),(cell+borderCell-1),(cell+borderCell+1)];
 this.greenCell(neighbours,cell);
  }

cellOnBottom(cell)
  {
   var borderCell = 0; var startCell=[];
      if(this.state.gSize == 1040){borderCell = 40;}
      else if(this.state.gSize== 2340){borderCell = 60;}
      else if(this.state.gSize == 4160){borderCell = 80;}
  var neighbours=[];
    if(cell == this.state.gSize-1)
  neighbours=[(cell-1),(cell-borderCell-1),(cell-borderCell)];
    else
    neighbours = [(cell+1),(cell-1),(cell-borderCell),(cell-borderCell-1),(cell-borderCell+1)];
  this.greenCell(neighbours,cell);
  }
  playGame(){
    if(this.state.gStatus == 'off'){this.startGame();this.birthCell();}
    this.stopGame();
    var self = this;
    this.setState({timerInterval: setInterval(function(){self.birthCell();}, 1000)});

  }
  stopGame(){
  //this.setState({timerInterval:''});
  clearInterval(this.state.timerInterval);
  }
  render(){
          let returned = this.drawer(this.state.gSize);
    return(
      <body><br/>
        Select <DropdownButton bsSize="small" bsStyle="info" title="Grid Size" id="bg-nested-dropdown">
        <MenuItem  onClick={this.gridSize.bind(this,1040)}   eventKey="1">1000 squares</MenuItem>
          <MenuItem  onClick={this.gridSize.bind(this,2340)}  eventKey="2">2400 squares</MenuItem>
          <MenuItem  onClick={this.gridSize.bind(this,4160)}  eventKey="3">4000 squares</MenuItem>
         </DropdownButton>
       <div>
             <div className="buttonGroup"><ButtonGroup>
             <Button bsSize="small" onClick={this.clearGrid.bind(this)} bsStyle="primary">Clear</Button> &nbsp; &nbsp;
              <Button onClick={this.startGame.bind(this)} bsSize="small" bsStyle="success">Randomness</Button> &nbsp; &nbsp;
               <Button onClick={this.birthCell.bind(this)} bsSize="small" bsStyle="success">Next Generation</Button> &nbsp; &nbsp;
              <Button onClick={this.playGame.bind(this)} bsSize="small" bsStyle="success">Start Game</Button> &nbsp; &nbsp;
              <Button bsSize="small" onClick={this.stopGame.bind(this)} bsStyle="danger">Stop</Button><br />
             </ButtonGroup>
             </div>
             <div  className="buttonGroup"> Generation <span> {this.state.generation} </span></div>
             <div className='container'>
                {returned.map(this.renderArray,this)}
              </div>
            </div>
       </body>);
  }
}
ReactDOM.render(<Board />,document.getElementById('root'));

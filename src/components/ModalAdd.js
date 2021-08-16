import React from 'react';
import './ModalAdd.css';
import Command from '../Command';
import { Item } from '../Objects/ItemTypes'
import { Proxy } from '../Proxy'
import { proxy } from '../App';

// function to create object
function createObject(Item){
  const newItemCommand = new Command(1, Item, 2)
  proxy.processCommand(newItemCommand)
}

// fucntion to get current date
export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

// modal component for adding items
export class ModalAdd extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        title: '',
        description: '',
        completed: 'false',
        date:''
    }
    this.setState = this.setState.bind(this)
  }
  handleSubmit(event) {
    let newItem = new Item(this.state)
    newItem.tags = []
    newItem.subItems = []
    newItem.lastAccessed = this.state.date
    createObject(newItem)
    this.setState({ isModalOpen: false })
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
        date: getCurrentDate()
    })
  }

  render(){
    const {show, close} = this.props; 
    const {title} = this.state;
    const {description} = this.state;
    const {completed} = this.state;
    const {date} = this.state;
    
    return (
      <div className="modal-wrapper"
        style={{
          transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
      >
        <div className="modal-header">
          <p>Second Brain</p>
          <span onClick={close} className="close-modal-btn">x</span>
        </div>
        <div className="modal-content">
          <div className="modal-body">
            <h4>Add an item</h4>
            <form>
              <input 
                  type="text"
                  id="todo-title"
                  name='title'
                  placeholder="Title:"
                  onChange={this.handleChange}
              /><br></br>
              <input                   
                  type="textarea"
                  id="todo-description"
                  name='description'
                  placeholder="Description:"
                  onChange={this.handleChange}
              /><br></br>
               <p><strong>{title}</strong></p>
               <p>{description}</p>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={() => this.handleSubmit()} onClick = {close} className="btn-cancel">Collect Item</button>
          </div>
        </div>
      </div>
    )
  }
}

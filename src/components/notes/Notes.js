import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: null,
    };
  }

  async componentDidMount() {
    const notes = (await axios.get('http://localhost:3000/notes/')).data;
    this.setState({
      notes,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.notes === null && <p>Loading Notes...</p>}
          {
            this.state.notes && this.state.notes.map(note => (
              <div key={note._id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`blog/question/${note._id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Date: {note.createdAt}</div>
                    <div className="card-body">
                      <h4 className="card-title">{note.title}</h4>
                      <p className="card-text">{note.content}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Notes;
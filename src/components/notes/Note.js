import React, {Component} from 'react';
import axios from 'axios';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const note = (await axios.get(`http://localhost:3000/notes/${params.noteId}`)).data;
    this.setState({
      note,
    });
  }

  render() {
    const {note} = this.state;
    if (note === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{note.title}</h1>
            <p className="lead">{note.content}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Note;
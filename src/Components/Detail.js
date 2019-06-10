import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
class Detail extends Component {
  state = {
    loading: false,
    ticket: null
  }

  componentWillMount() {
    const { match: { params } } = this.props;
    this.setState({loading: true})
    axios
      .get(`/api/ticket/detail/${params.id}`)
      .then(response => {
        this.setState({ticket: response.data, loading: false});
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const {loading, ticket} = this.state;
    if(loading) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <div className="container">
        <div><button onClick={this.goBack}>Go Back</button></div>
        {JSON.stringify(ticket)}
      </div>
    );
  }
}

export default Detail;
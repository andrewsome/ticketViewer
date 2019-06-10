import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';
class Detail extends Component {
  state = {
    loading: false,
    ticket: null
  }

  componentWillMount() {
    const {match: {
        params
      }} = this.props;
    this.setState({loading: true})
    axios
      .get(`/api/ticket/detail/${params.id}`)
      .then(response => {
        this.setState({ticket: response.data.ticket, loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
        cogoToast.error('Failed to get the ticket')
      })
  }

  goBack = () => {
    this
      .props
      .history
      .goBack();
  }

  render() {
    const {loading, ticket} = this.state;
    if (loading) {
      return (
        <div className="center">Loading</div>
      );
    }
    return (ticket
      ? <div className="container">
          <h1>Details of ticket No.{ticket.id}</h1>
          <h1 id='subject'>{ticket.subject}</h1>
          <p>{ticket.description}</p>
          <div>
            <button className="backButton" onClick={this.goBack}>Go Back</button>
          </div>
        </div>
      : <div className="center">
        <p>Cannot get ticket detail
        </p>
        <div>
          <button className="backButton" onClick={this.goBack}>Go Back</button>
        </div>
      </div>);
  }
}

export default Detail;
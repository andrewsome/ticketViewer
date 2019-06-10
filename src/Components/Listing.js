import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import '../App.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import moment from 'moment'

class Listing extends Component {
  state = {
    loading: false,
    tickets: [],
    currentPage: 0
  }

  componentWillMount() {
    this.setState({loading: true})
    const currentPageFromStorage = sessionStorage.getItem("currentPage");
    if (currentPageFromStorage) {
      this.setState({currentPage: currentPageFromStorage});
    }
    const ticketsFromSessionStorage = sessionStorage.getItem("tickets");
    if (ticketsFromSessionStorage) {
      const tickets = JSON.parse(ticketsFromSessionStorage);
      this.setState({tickets: tickets, loading: false});
      return;
    }
    axios
      .get('/api/ticket/listing')
      .then(response => {
        sessionStorage.setItem("tickets", JSON.stringify(response.data.tickets));
        this.setState({tickets: response.data.tickets, loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
        cogoToast.error('Failed to get the tickets')
      })
  }

  changePage = (index) => {
    this.setState({currentPage: index});
    sessionStorage.setItem("currentPage", index);
  }

  render() {
    const {loading, tickets, currentPage} = this.state;
    return (
      <div className="container">
        <h1>Ticket Viewer</h1>
        <ReactTable
          data={tickets}
          loading={loading}
          className="-striped -highlight pointer"
          page={currentPage}
          onPageChange={index => this.changePage(index)}
          noDataText="No ticket found"
          getTrProps={(state, rowInfo) => ({
            onClick: () => this.props.history.push(`/detail/${rowInfo.row.id}`)
          })}
          columns={[
          {
            Header: "Id",
            accessor: "id",
            width: 150
          }, {
            Header: "Subject",
            accessor: "subject"
          }, {
            Header: "Status",
            accessor: "status",
            width: 200
          }, {
            Header: "Created at",
            id: "created_at",
            accessor: d => {
              return moment(d.created_at)
                .local()
                .format("YYYY/MM/DD HH:mm:ss")
            }
          }, {
            Header: "Updated at",
            id: "updated_at",
            accessor: d => {
              return moment(d.updated_at)
                .local()
                .format("YYYY/MM/DD HH:mm:ss")
            }
          }
        ]}/>
      </div>
    );
  }
}

export default Listing;
import React, {Component} from 'react';
import ReactTable from "react-table";
import { Link } from "react-router-dom";

import "react-table/react-table.css";
import '../App.css';
import axios from 'axios';
class Listing extends Component {
  state = {
    loading: false,
    tickets: [],
    currentPage:0
  }

  componentWillMount() {
    this.setState({loading: true})
    const currentPageFromStorage = sessionStorage.getItem("currentPage");
    if(currentPageFromStorage){
      this.setState({
        currentPage: currentPageFromStorage
      });
    }
    const ticketsFromSessionStorage = sessionStorage.getItem("tickets");
    if(ticketsFromSessionStorage) {
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
      .catch(function (error) {
        console.log(error);
      })
  }
  
  changePage = (index) => {
    this.setState({
      currentPage: index
    });
    sessionStorage.setItem("currentPage", index);
  }

  render() {
    const {loading, tickets, currentPage} = this.state;
    return (
      <div className="container">
        <ReactTable
          data={tickets}
          loading={loading}
          className="-striped -highlight"
          page={currentPage}
          onPageChange={index => this.changePage(index)}
          columns={[
          {
            Header: "Id",
            accessor: "id",
            Cell: row => (
              <Link to={`/detail/${row.value}`}><span>{row.value}</span></Link>
            )
          }, {
            Header: "Subject",
            accessor: "subject"
          }, {
            Header: "Status",
            accessor: "status"
          }
        ]}/>
      </div>
    );
  }
}

export default Listing;
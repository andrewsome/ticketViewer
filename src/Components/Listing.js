import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import '../App.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import moment from 'moment'
import queyrString from 'query-string'

class Listing extends Component {
  state = {
    loading: false,
    tickets: [],
    currentPage: 1,
    limit: 20,
    totalRows: null
  }

  componentWillMount() {
    //get query string
    const parsed = queyrString.parse(this.props.location.search);

    this.setState({
      currentPage: parsed.page
        ? parseInt(parsed.page)
        : 1,
      limit: parsed.limit
        ? parseInt(parsed.limit)
        : 20
    }, () => this.fetchTickets())

  }

  fetchTickets = () => {
    this.setState({loading: true})
    const {currentPage, limit} = this.state;
    axios
      .get(`/api/ticket/listing?page=${currentPage}&limit=${limit}`)
      .then(response => {
        this.setState({tickets: response.data.tickets, loading: false, totalRows: response.data.count});
      })
      .catch(error => {
        this.setState({loading: false});
        cogoToast.error('Failed to get the tickets')
      })
  }

  changePage = (index) => {
    this.setState({
      currentPage: index
    }, () => this.fetchTickets());
    const {limit} = this.state;
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?page=${index}&limit=${limit}`;
    window
      .history
      .pushState({
        path: newurl
      }, '', newurl);
  }

  changePageSize = (limit) => {
    this.setState({
      currentPage: 1,
      limit: limit
    }, () => this.fetchTickets());
    const {currentPage} = this.state;
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?page=${currentPage}&limit=${limit}`;
    window
      .history
      .pushState({
        path: newurl
      }, '', newurl);
  }

  render() {
    const {loading, tickets, currentPage, totalRows, limit} = this.state;
    const totalPages = Math.ceil(totalRows / limit);
    return (
      <div className="container">
        <h1>Ticket Viewer</h1>
        <ReactTable
          data={tickets}
          loading={loading}
          className="-striped -highlight pointer"
          page={currentPage - 1}
          pageSize={limit}
          onPageChange={index => this.changePage(index + 1)}
          onPageSizeChange={limit => this.changePageSize(limit)}
          pages={totalPages}
          noDataText="No ticket found"
          manual
          getTrProps={(state, rowInfo) => ({
          onClick: () => this
            .props
            .history
            .push(`/detail/${rowInfo.row.id}`)
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
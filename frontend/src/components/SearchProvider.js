import React, { Component } from "react";

export const Context = React.createContext();

export class SearchProvider extends Component {
  state = {
    results: [],
    currentPage: 1,
    resultPerPage: 18,
    pageNumbers: [],
    loading: false,
    resultStateMessage: "Please search something!",

    availableCheckboxes: ["gittigidiyor", "hepsiburada", "n11", "amazon"],
  };
  componentDidMount() {
    this.setState({
      pageNumbers: [
        ...Array(
          Math.ceil(this.state.results.length / this.state.resultPerPage) + 1
        ).keys(),
      ].slice(1),
    });
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          test: () => console.log("test"),
          onSubmit: (event) => {
            event.preventDefault();
            const {
              query,
              gittigidiyor,
              hepsiburada,
              n11,
              amazon,
              lowerPrice,
              higherPrice,
            } = event.target;
            // console.log(event.target);
            // console.log(query.value);
            // console.log(gittigidiyor.checked);
            this.setState({
              results: [],
              pageNumbers: [],
              loading: true,
              resultStateMessage: "Loading...",
            });
            //db connection
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: query.value == null ? "" : query.value,
                hepsiburada: hepsiburada == null ? false : hepsiburada.checked,
                gittigidiyor:
                  gittigidiyor == null ? false : gittigidiyor.checked,
                n11: n11 == null ? false : n11.checked,
                amazon: amazon == null ? false : amazon.checked,
                price_low: lowerPrice == null ? 0 : parseInt(lowerPrice.value),
                price_high:
                  higherPrice == null
                    ? 9999999999
                    : parseInt(higherPrice.value),
              }),
            };

            fetch("http://localhost:5000", requestOptions)
              .then((res) => res.text())
              .then((json) => {
                console.log(JSON.parse(json));
                this.setState({
                  results: JSON.parse(json),
                  loading: false,
                  pageNumbers: [
                    ...Array(
                      Math.ceil(
                        JSON.parse(json).length / this.state.resultPerPage
                      ) + 1
                    ).keys(),
                  ].slice(1),
                });
                if (JSON.parse(json).length === 0) {
                  this.setState({
                    resultStateMessage: `Nothing found with '${query.value}'`,
                  });
                } else {
                  this.setState({
                    resultStateMessage: "",
                    currentPage: 1,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                this.setState({ results: err.toString(), loading: false });
              });
          },
          changePage: (pageNumber) => {
            this.setState({ currentPage: pageNumber });
          },
          changeResultPerPage: (PerPage) => {
            this.setState({
              resultPerPage: PerPage,
              pageNumbers: [
                ...Array(
                  Math.ceil(this.state.results.length / PerPage) + 1
                ).keys(),
              ].slice(1),
            });
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default SearchProvider;

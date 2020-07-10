import React from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "./index";

export const Paginations = () => {
  return (
    <Context.Consumer>
      {(context) => (
        <Pagination hidden={context.state.pageNumbers.length === 1}>
          {context.state.pageNumbers.map((number) => (
            <Pagination.Item
              active={number === context.state.currentPage}
              key={number}
              onClick={() => context.changePage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Context.Consumer>
  );
};

// Paginations.contextType = Context;
//14/15 =1

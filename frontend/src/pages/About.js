import React, { Component } from "react";

export class About extends Component {
  state = {
    name: "Emre Özincegedik",
    school_number: "185050801",
    email: "ug.emre.ozincegedik@toros.edu.tr",
    project_teacher: "Furkan Gözükara",
    project_teacher_email: "furkan.gozukara@toros.edu.tr",
  };
  componentDidMount() {
    document.title += " About";
  }

  render() {
    const info = (text, textStyle = "text-light") => {
      return (
        <p className={textStyle} style={style.textAlignment}>
          {text}
        </p>
      );
    };

    return (
      <div style={style.center}>
        <div>
          <h2>{info(this.state.name)}</h2>
          {info(`School no: ` + this.state.school_number)}
          {info(this.state.email)}
          <hr className="style2" />
          <h5>
            {info(
              "This project is done for mvc class using Node.js, React, Express, MySQL"
            )}
          </h5>
          {info(`Project teacher: ${this.state.project_teacher}`)}
          {info(`Project teacher email: ${this.state.project_teacher_email}`)}
        </div>
      </div>
    );
  }
}

const style = {
  textAlignment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    minHeight: "80vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

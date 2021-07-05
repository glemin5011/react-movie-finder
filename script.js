//MovieFinder that is the whole app
//UserInput that is the input component and handlesChange
//Movie component that is a col-12 element with the img, title, type, date variables fetched from API

class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <UserInput />
          </div>
          <div className="row">
            <Movies />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
    };
  }
  render() {
    return (
      <React.Fragment>
        <input type="text" placeholder="movie" />
        <button className="btn btn-primary"></button>
      </React.Fragment>
    );
  }
}

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-6">
          <img src="{image}" />
        </div>
        <div className="col-6">
          <h5>{movie}</h5>
          <p>{type}</p>
          <span> | </span>
          <p>{year}</p>
        </div>
      </React.Fragment>
    );
  }
}

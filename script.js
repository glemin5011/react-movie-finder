//MovieFinder that is the whole app
//UserInput that is the input component and handlesChange
//Movie component that is a col-12 element with the img, title, type, date variables fetched from API

class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  render() {
    const { results } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h1 className="text-center">Movie Finder</h1>
          <div className="row">
            <UserInput />
            {results.map((movie) => {
              return null; //returns nothing for now
            })}
          </div>
          <div className="row"></div>
        </div>
      </React.Fragment>
    );
  }
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    const { searchTerm } = this.state;
    return (
      <div className="col-4">
        <form onSubmit={this.handleSubmit} className="form-inline my-4">
          <input
            type="text"
            className="form-control mr-sm-2"
            placeholder="frozen"
            value={searchTerm}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
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

ReactDOM.render(<MovieFinder />, document.getElementById("root"));

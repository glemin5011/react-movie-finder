//MovieFinder that is the whole app
//UserInput that is the input component and handlesChange
//Movie component that is a col-12 element with the img, title, type, date variables fetched from API

class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      error: "",
    };
    this.addMovieResults = this.addMovieResults.bind(this);
  }

  addMovieResults(data) {
    if (Array.isArray(data) === true) {
      this.setState({ results: data, error: "" });
      console.log(this.state.results);
    } else {
      this.setState({ results: "", error: data });
      console.log(this.state.error);
    }
  }

  render() {
    const { results, error } = this.state;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <h1 className="text-center">Movie Finder</h1>
          <div className="row">
            <UserInput onSubmit={this.addMovieResults} />
            {(() => {
              if (!error) {
                return results.map((movie) => {
                  return <Movie key={movie.imdbID} movie={movie} />;
                });
              } else {
                return <h1>{error}</h1>;
              }
            })()}
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
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim(); // clean the string
    if (!searchTerm) {
      //if value is empty return nothing
      return;
    }

    //AJAX request to OMDBAPI to get a list of results

    const checkStatus = (response) => {
      if (response.ok) {
        //.ok returns true if response status is 200-299
        return response;
      }
      throw new Error("Request was either a 404 or 500");
    };

    const json = (response) => response.json();

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=61c1fa07`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        if (data.Response === "True" && data.Search) {
          this.props.onSubmit(data.Search);
          //this.setState({ error: "" });
        }
      })
      .catch((error) => {
        //this.setState({ error: error.message });
        this.props.onSubmit(error.message);
      });
  }
  render() {
    const { searchTerm } = this.state;
    return (
      <div className="col-4">
        <form onSubmit={this.handleSubmit} className="form-inline my-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Movie name"
              value={searchTerm}
              onChange={this.handleChange}
            />
            <button type="submit" className="btn btn-lg btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Title, Year, imdbID, Type, Poster } = this.props.movie;
    return (
      <div className="row">
        <div className="col-4 col-md-3 mb-3">
          <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
            <img src={Poster} className="img-fluid" />
          </a>
        </div>
        <div className="col-8 col-md-9 mb-3">
          <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
            <h4>{Title}</h4>
            <p>
              {Type} | {Year}
            </p>
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MovieFinder />, document.getElementById("root"));

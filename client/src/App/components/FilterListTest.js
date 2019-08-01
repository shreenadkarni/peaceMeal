const Student = (props) => <li className="student-item">{props.name}</li>;

class StudentFilter extends React.Component {
  handleChange (event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <input type="text" placeholder="Find a student" className="input-search" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
    )
  }
}



class StudentList extends React.Component {

  filter (students) {
    if (!this.props.filter) {
      return students
    }
    return students.filter((student) => student.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
  }
  render () {
    return (
        <ul className="student-list">
          {   this.filter(this.props.students)
              .map((student) => <Student name={student}></Student>)}
        </ul>
    )
  }
};



class App extends React.Component {

  constructor () {
    super();
    const STUDENTS = ['Elia Larkey','Joyce Bearce','Clint Strahan',
                     'Maude Defrank', 'Soila Hendren', 'Eliana Carrales',
                      'Marquerite Bettes', 'Mikaela Authement', 'Elyse Toscano',
                      'Ginette Solomon', 'Wanita Sprinkle', 'Yen Hagans',
                      'Annmarie Schaper', 'Gregg Wilkins', 'Eura Prue', 'Addie Madding',
                      'Tameika Murph', 'Keenan Woolsey', 'Hertha Hyer',
                      'Sharan Letsinger'];


    this.state = {
      students: STUDENTS,
      filter: null
    };
  }

  updateSearch (inputValue) {
    let filter = this.state.filter;

    this.setState({
      filter: inputValue
    });
  }

  render () {
    return (
      <div className="app">
        <h1 className="app__title">Your Students</h1>
        <StudentFilter updateSearch={this.updateSearch.bind(this)} searchText={this.state.filter} />
        <StudentList filter={this.state.filter} students={this.state.students}></StudentList>
      </div>
    );
  }
}

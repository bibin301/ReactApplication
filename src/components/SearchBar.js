import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {removeTermType, addTerm} from '../reducers/actions.js';
import SelectDropDown from './selectDropdown.js';


class  SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      options: [],
      selectedOptionIndex: 0,
      location: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event){
      const keyCode = event.keyCode;
      if (keyCode == 13 && this.state.options.length)
      {
        const term = this.state.options[this.state.selectedOptionIndex];
        term ? this.props.replaceTerm(term) : null;
        this.setState({
          options: [],
          value: term.display,
        });
      }
      else if(keyCode == 38 && this.state.selectedOptionIndex > 0)
      {
        this.setState({
          selectedOptionIndex: this.state.selectedOptionIndex - 1,
        });
      }
      else if(keyCode == 40 && this.state.selectedOptionIndex < this.state.options.length - 1)
      {
        this.setState({
          selectedOptionIndex: this.state.selectedOptionIndex + 1,
        });
      }
  }

  handleChange(event){
      event.stopPropagation();
      event.preventDefault();
      this.setState({
        value: event.target.value,
        options: event.target.value ? this.props.filters.filter((filter)=>{
          if (filter.type == 'location')
            return false;
          else {
            const regex = new RegExp('\\b' + event.target.value , 'gi');
            return (filter.display.match(regex));
          }
        }) : "",
        selectedOptionIndex: 0,
      });
  }

  handleBlur(){
    this.setState({
      options: [],
      selectedOptionIndex: 0,
    });
  }

  selectValue(option){
    this.props.replaceTerm(option);
    this.setState({
      value: option.display,
      options: [],
      selectedOptionIndex: 0,
    });
  }

  render(){
    const {search} = this.props;
    return (
        <div className="search">
          <img src={require('../images/search-icon.png')} className="search-icon" />
          <input placeholder="Search by Position, Restaurant"
                 onChange={this.handleChange}
                 onKeyDown={this.handleKeyDown}
                 value={this.state.value}/>
          <div className="divider" />
          <div className="location">
            Select Location
            <SelectDropDown
              placeholder="Enter a Location"
              topOptionText="Top Locations"/>
          </div>
          <img src={require('../images/triangle-down.png')} className="triangle-down" />
          <button onClick={()=>{search(this.state.value);}}>
            Get Job Offers
          </button>
          {this.state.options.length? (
            <div className="dropdown">
              {this.state.options.map((option, index) => (
                <div className={this.state.selectedOptionIndex == index ? 'option selected' : 'option'}
                     key={index}
                     onClick={()=>{this.selectValue(option);}}
                onBlur={this.handleBlur}>{option.display}</div>
              ))}
            </div>
          ): null}
        </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func,
  filters: PropTypes.array,
  replaceTerm: PropTypes.func,
};

const mapStateToProps = ({searchTerms, filters}) => {
  return {
      searchTerms,
      filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (value) => {
      if (!value)
      {
        dispatch(removeTermType('non-location'));
      }
      dispatch(push('/jobs'));
    },
    replaceTerm: (term)=> {
      dispatch(removeTermType('non-location'));
      dispatch(addTerm(term));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

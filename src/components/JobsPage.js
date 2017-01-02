import React from 'react';
import { Link } from 'react-router';
import '../styles/jobspage.scss';

const JobsPage = () => {
  return (
    <div className="jobs-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={require('../images/logo.png')} />
          </Link>
        </div>
        <div className="search-area">
          <img src={require('../images/search-icon.png')} />
          <input placeholder="Search by Position, Restruarant, Location" />
        </div>
        <div className="avatar-area">
          <img src={require('../images/bell.png')} className="bell" />
          <div className="user">
            Sebastian Wussler
          </div>
          <img src="https://s30.postimg.org/jq2v3j0jl/userlogo.jpg" className="avatar"/>
        </div>
      </div>
      <div className="profile-completion-status">
        Your profile is incomplete. Complete your profile for getting more jobs.
        <div style={{'width':'38%'}} className="status-bar" />
      </div>
      <div className="main">
        <div className="job-list" >
          <div className="filter-bar">
            <div className="filter">Location &#9662;</div>
            <div className="filter">Job Title &#9662;</div>
            <div className="filter">Restaurant Type &#9662;</div>
            <div className="filter">Job Type &#9662;</div>
            <div className="filter">Compensation &#9662;</div>
          </div>
          <div className="list" >
            No Jobs Found
          </div>
        </div>
        <div className="job-detail" />
      </div>
    </div>
  );
};

export default JobsPage;
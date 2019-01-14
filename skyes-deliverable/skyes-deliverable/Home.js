import React, { Component } from 'react'
import './Home.css'

import { BrowserRouter as Router, Route} from 'react-router-dom'

import Sidebar from '../../components/Sidebar/Sidebar'

import Clients from './Clients/Clients'
import Client from './Clients/Client/Client'
import Dashboard from './Dashboard/Dashboard'
import Projects from './Projects/Projects'
import Project from './Projects/Project/Project'
import Community from './Community/Community'
import Process from './Process/Process'
import Settings from './Settings/Settings'

import GenerateClientList from '../../functions/GenerateClientData'
import GenerateProjectList from '../../functions/GenerateProjectData'
import GenerateTeamList from '../../functions/GenerateUserData'
import GenerateTagList from '../../functions/GenerateTagData'

class Home extends Component {

  state={
    location: "",
    user: null,
    clients: [],
    projects: [],
    people: [],
    peopleTags: [],
    projectTags: [],
    clientTags: [],
  }

  componentDidMount(){
    const peopleTags = GenerateTagList('people', Math.round(Math.random()*5))
    const projectTags = GenerateTagList('projects', 1+Math.round(Math.random()*4))
    const clientTags = GenerateTagList('clients', Math.round(Math.random()*5))
    const people = GenerateTeamList(1+Math.round(Math.random()*5), peopleTags) // 1-6 Team members
    const user = people[0]
    const clients =  GenerateClientList(5+Math.round(Math.random()*5), clientTags) //5-10 Clients
    const projects = GenerateProjectList(clients, 1+Math.round(Math.random()*2), people, projectTags) // 1-3 Projects per client
    this.setState({user, clients, projects, people, peopleTags, projectTags, clientTags})
  }

  render() {

    let pathProps = {
      user: this.state.user,
      deauthenticate: this.props.deauthenticate,
      clients: this.state.clients,
      projects: this.state.projects,
      people: this.state.people,
      peopleTags: this.state.peopleTags,
      projectTags: this.state.projectTags,
      clientTags: this.state.clientTags,
    }

    return (
      <div>
        <Router>
          <div className="container">
            <Sidebar />
            <div className="content">
              <Route path="/" exact       render={(props)=><Dashboard {...props} pathProps={pathProps} />} />
              <Route path="/clients"      render={(props)=><Clients   {...props} pathProps={pathProps} />} />
              <Route path="/client/:id"   render={(props)=><Client    {...props} pathProps={pathProps} />} />
              <Route path="/projects"     render={(props)=><Projects  {...props} pathProps={pathProps} />} />
              <Route path="/project/:id"  render={(props)=><Project   {...props} pathProps={pathProps} />} />
              <Route path="/community"       render={(props)=><Community    {...props} pathProps={pathProps} />} />
              <Route path="/process"     render={(props)=><Process  {...props} pathProps={pathProps} />} />
              <Route path="/settings"     render={(props)=><Settings  {...props} pathProps={pathProps} />} />
            </div>
          </div>
        </Router>
      </div>
    )
  }

}

export default Home

import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import './assets/scss/global.scss'
import { useState } from 'react'
import { Home } from './views/Home'
import { ContactIndex } from './views/ContactIndex'
import { StatisticPage } from './views/StatisticPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { LoginSignup } from './views/LoginSignup'
// import './App.css';

import React from 'react'

export default function App() {

  return (
    <Router>
        <section className="main-app">
            <AppHeader />
            <section className='main-container'>
            <main className="container">
                <Switch>
                    <Route path="/contact/edit/:id?" component={ContactEdit} />
                    <Route path="/contact/:id" component={ContactDetails} />
                    <Route path="/contact" component={ContactIndex} />
                    {/* <Route path="/about" component={About} /> */}
                    <Route path="/loginSignup" component={LoginSignup} />
                    <Route path="/statistic" component={StatisticPage} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
            </section>
        </section>
    </Router>
)
  // return (
  //   <div className="App">
  //    
  //     <main className="main-container">
  //       {mainContent()}
  //     </main>
  //   </div>
  // );
}


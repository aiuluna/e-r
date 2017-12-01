/**
 * Created by huzhang on 2017/11/22.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  withRouter
} from 'react-router-dom'
import Home from './page/Home'
import Features from './page/Features'
import Advantages from './page/Advantages'
import AboutUs from './page/AboutUs'
import Head from './component/Head'

import "./index.scss"

class Index extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  callMobile() {
    window.location.href = "tel:4008755656"
  }

  render() {
    return (
      <Router>
        <div>
          <Head callMobile = {this.callMobile}/>
          <div className="main">
            <Route exact strict path="/" component={Home}/>
            <Route path="/productFeatures" component={Features}/>
            <Route path="/productAdvantages" component={Advantages}/>
            <Route path="/aboutUs" component={AboutUs}/>

            <div className="footer">
              <ul className="nav">
                <li><NavLink exact to="/">首页</NavLink></li>
                <li><NavLink to="/productFeatures">产品功能</NavLink></li>
                <li><NavLink to="/productAdvantages">产品优势</NavLink></li>
                <li><NavLink to="/aboutUs">关于我们</NavLink></li>
              </ul>
              <div className="info">
                版权所有·aiuluna|浙ICP备14034118号 <br/>
                Copyright © 2017 aiuluna.com All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('app'));

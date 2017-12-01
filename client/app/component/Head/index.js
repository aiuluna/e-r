/**
 * Created by huzhang on 2017/11/27.
 */
import React, {Component} from 'react'
import {
  withRouter
} from 'react-router-dom'
import PropTypes from 'prop-types';
import Dialog from '../reserveDialog'

import './index.scss'

class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rightNav: false,
      reserveDialog: false,
      hasName: true,
      hasMobile: true,
      dialog: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  triggerRightNav() {
    this.setState({
      rightNav: !this.state.rightNav,
      dialog: false
    })
  }


  toLink(path) {
    this.props.history.push(path)
    this.triggerRightNav()
  }

  openDialog() {
    this.setState({
      dialog: true
    })
    setTimeout(()=> {
      this.setState({
        dialog: false
      })
    },0)
  }

  scrollToReserve() {
    this.props.history.push('/')
    setTimeout(()=> {
      this.scrollToAnchor('reserveAnchor')
    }, 0)
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  }

  render() {
    const {rightNav, reserveDialog} = this.state;
    return (
      <div className="header">
        <img className="icon" src={require("../../common/images/icon.png")}/>
        <span>专业三方物流系统</span>
        <img className="nav" src={require("../../common/images/nav.png")} onClick={this.triggerRightNav.bind(this)}/>
        <ul className="right-nav" style={rightNav ? {display: 'block'} : {display: 'none'}}>
          <li onClick={this.toLink.bind(this, "/")}>首页</li>
          <li onClick={this.toLink.bind(this, "/productFeatures")}>产品功能</li>
          <li onClick={this.toLink.bind(this, "/productAdvantages")}>产品优势</li>
          <li onClick={this.toLink.bind(this, "/aboutUs")}>关于我们</li>
        </ul>
        <div className="nav_mask" style={rightNav ? {display: 'block'} : {display: 'none'}}
             onClick={this.triggerRightNav.bind(this)}>
        </div>

        <img id="resBtn" className="reserve" src={require("@/common/images/reserve.png")}
             onClick={this.openDialog.bind(this)}/>
        <img className="phone" src={require("@/common/images/phone.png")} onClick={this.props.callMobile}/>
        {/*预约弹框*/}
        <Dialog open={this.state.dialog}/>
      </div>
    )
  }
}

export default withRouter(Head);
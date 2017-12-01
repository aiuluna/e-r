/**
 * Created by huzhang on 2017/11/27.
 */
import React, {Component} from 'react'
import LazyLoad from 'react-lazy-load';

import './index.scss'

class Features extends Component {
  constructor(props) {
    super(props)
  }

  callMobile() {
    window.location.href = "tel:4008755656"
  }

  render() {
    const firstImgH = document.body.clientWidth * (760 / 640);
    return (
      <div className="features">
        <LazyLoad height={firstImgH}>
          <img src={require("@/common/images/features/features_1.png")}/>

        </LazyLoad>

        <img className="q_3" src={require('@/common/images/home/home_q_4.png')} onClick={this.callMobile.bind(this)}/>
        <div className="content">
          以NB-IOT窄带宽物联网技术为核心,解决三方运输层层分包信息断层问题,真正实现“一单到底”,全面提升
          货物运输及时履约能力。
        </div>
        <div className="title">
          NB-IOT技术
        </div>
        <img style={{padding: "0 35px 100px 35px"}} src={require('@/common/images/features/features_2.png')}/>

      </div>
    )
  }
}

export default Features
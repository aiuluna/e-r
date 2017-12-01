/**
 * Created by huzhang on 2017/11/27.
 */
import React, {Component} from 'react'
import LazyLoad from 'react-lazy-load';
import './index.scss'

class Advantages extends Component {
  constructor(props) {
    super(props)
    this.data = [
      {
        src: 'ad_02.png',
        title: '安全及时的',
        titleWeight: '订单履约能力',
        info: '借助最新NB-IOT窄带宽物联网技术,让货品自带收集和传达' +
        '信息的能力,适应新时代背景下,货主企业日益着重的订单履约需求。'
      },
      {
        src: 'ad_03.png',
        title: '技高一筹的',
        titleWeight: '招投标竞争实力',
        info: '深刻满足货主企业对货品智能追踪、状态监控、异常上报等关键需求，报表分析、数据看板加强三方企业精细化管理能力，提升招投标竞争实力。'
      },
      {
        src: 'ad_04.png',
        title: '专注专业的',
        titleWeight: '客户服务能力',
        info: '一套系统，即可满足所有不同类型上游货主企业货物追踪需求，客户服务因为专注，所以专业。'
      },
      {
        src: 'ad_05.png',
        title: '服务于所有行业客户的',
        titleWeight: '超强适应能力',
        info: '抛开行业限制，适用于为不同类型货主企业服务。'
      }
    ]
  }

  callMobile() {
    window.location.href = "tel:4008755656"
  }

  render() {
    const imgH = document.body.clientWidth * (655 / 640),
      firstImgH = document.body.clientWidth * (987/ 640);
    return (
      <div className="advantages">
        <LazyLoad height={firstImgH}>
          <img src={require("@/common/images/advantages/ad_01.png")}/>
        </LazyLoad>
        <img className="phone" src={require("@/common/images/home/home_q_4.png")} onClick={this.callMobile.bind(this)}/>
        {this.data.map((item, index)=> {
          return (
            <div key={index} className="content">
              <LazyLoad height={imgH}>
                <img src={require("@/common/images/advantages/" + item.src)}/>
              </LazyLoad>
              {index === 3 ?
                <div className="title" style={{fontSize: '.3rem'}}>
                  {item.title}
                  <span>{item.titleWeight}</span>
                </div>:
                <div className="title">
                  {item.title}
                  <span>{item.titleWeight}</span>
                </div>
              }


              <div className="line"></div>
              <div className="info">
                {item.info}
              </div>
            </div>
          )
        })}

      </div>
    )
  }
}

export default Advantages
/**
 * Created by huzhang on 2017/11/27.
 */
import React, {Component} from 'react'
import './index.scss'

class AboutUs extends Component {
  constructor(props) {
    super(props)
  }
  openDialog() {
    document.getElementById('resBtn').click()
  }

  openOfficial() {
    window.location.href = "//www.kuaihuoyun.com"
  }

  render() {
    return (
      <div className="aboutUs">
        <img src={require("@/common/images/aboutUs/ab_01.png")}/>
        <div style={{padding: ".36rem .52rem 1.34rem .52rem", textIndent: '2em'}}>
          <div>3TMS专业三方物流系统，为快货运旗下品牌，以NB-IoT窄带物联网技术为核心，解决三方运输业务层层分包信息断层问题，真正实现“一单到底”，全面提升货物运输履约能力。</div>
          <div>快货运是国内新一代物流科技综合服务商，以前沿科技赋能物流，致力于改造万亿市场规模的传统物流市场。通过运用云计算、大数据、物联网、传感网等最新技术，为货运企业提供领先的物流信息化、金融科技及智能硬件专业解决方案。</div>
          <div>快货运以旗下cTMS、nTMS、3TMS三套物流SaaS系统，分别服务同城、零担、整车运输场景，帮助用户提升效率、降低成本，并通过连接发货人、收货人和不同承运企业，构建全国运力信息化、智能化流通网络，实现运力各端的互联互通。</div>
          <div>同时，基于大数据与信息化，实现商流、物流、资金流、信息流的融合与监控，构建严格的风控体系，为物流企业赋能，向产业链上下游商贸企业或商户提供“新金融”和“新零售”附加值服务。</div>
        </div>
        <img style={{padding: "0 .34rem"}} src={require("@/common/images/aboutUs/ab_02.png")}/>

        <div className="qualification">
          <div>
            <img src={require("@/common/images/aboutUs/ab_star.png")}/>
            <span>中国交通运输协会会员</span>
          </div>
          <div>
            <img src={require("@/common/images/aboutUs/ab_star.png")}/>
            <span>中国物流与采购联合会会员</span>
          </div>
          <div>
            <img src={require("@/common/images/aboutUs/ab_star.png")}/>
            <span>浙江综合交通物流行业协会“常务理事单位”</span>
          </div>
          <div>
            <div style={{width: '.24rem'}}>
              <img src={require("@/common/images/aboutUs/ab_star.png")}/>
            </div>

            <span>浙江综合交通物流行业协会“物流信息化分会副理事单位”</span>
          </div>
          <div>
            <img src={require("@/common/images/aboutUs/ab_star.png")}/>
            <span>物流平台诚信公约联盟单位</span>
          </div>
        </div>
        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center', marginBottom: '.6rem'}}>
          <img style={{width: '2.44rem'}} src={require('../../common/images/home/home_5.png')}/>
          <div style={{marginTop: '.21rem', fontSize: '.24rem', color: '#4c59fb', textAlign: 'center'}}>
            微信搜索【3TMS】或扫描二维码，<br/>
            关注公众号
          </div>
        </div>

        {/*<div className="btn_list">
          <div className="btn_1" onClick={this.openDialog.bind(this)}>
            预约试用
          </div>
          <div className="btn_2" onClick={this.openOfficial.bind(this)}>
            前往快货运官网
          </div>
        </div>*/}
      </div>
    )
  }
}

export default AboutUs
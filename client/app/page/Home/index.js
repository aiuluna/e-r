/**
 * Created by huzhang on 2017/11/23.
 */
import React, {Component} from 'react'
import Request from '@/common/js/request'

import './index.scss'

const request = new Request()

class Home extends Component {
  constructor(props) {
    super(props)
    this.data = {
      content1: [
        {
          src: "home_q_5_1.png",
          title: "上市公司投资",
          info: "获得某知名上市公司千万美元级别融资"
        },
        {
          src: "home_q_5_2.png",
          title: "冠军级创新产品",
          info: "荣获“中国青年互联网创业大赛”冠军"
        },
        {
          src: "home_q_5_3.png",
          title: "全程智能追踪",
          info: "通过NB-IoT物联网技术,全程追踪货物流转情况。"
        }
      ],
      content2: [
        {
          src: "home_2.png",
          title: "智能追踪",
          info: "NB-IOT窄带物联网技术,每单货物精准定位,解决长途运输层层分包信息断层问题,真正实现“一单到底”",
          list: [
            {src: "001.png", intro: "NB-IOT技术"},
            {src: "002.png", intro: "精准定位"},
            {src: "003.png", intro: "承运商信息追踪"},
            {src: "004.png", intro: "异常上报"}
          ]
        },
        {
          src: "home_3.png",
          title: "数据分析",
          info: "完善的数据管理体系,各类报表多维度关联分析,并通过数据看板实时呈现,为企业决策提供有力依据",
          list: [
            {src: "005.png", intro: "订单管理"},
            {src: "006.png", intro: "车辆管理"},
            {src: "007.png", intro: "利润分析"},
            {src: "008.png", intro: "时效监控"},
            {src: "009.png", intro: "异常预警"}
          ]
        },
        {
          src: "home_4.png",
          title: "智能结算",
          info: "上下游承运商层层分段管理,批量自动结算,大幅减轻财务团队压力,提升效率,节省人工成本",
          list: [
            {src: "010.png", intro: "分段计价"},
            {src: "011.png", intro: "承运商间运费保密"},
            {src: "012.png", intro: "定制化计价"},
            {src: "013.png", intro: "自动化结算"}
          ]
        }
      ]
    }
    this.nameInput = ""
    this.mobileInput = ""
    this.companyInput = ""
    this.state = {
      hasName: true,
      hasMobile: true,
      showVideo: false
    }
  }

  componentDidMount() {

  }

  //预约
  toReserve() {
    if (!this.nameInput.value.trim()) {
      alert('请输入姓名')
      this.triggerVal()
      return
    }
    if (!this.mobileInput.value.trim()) {
      alert('请输入手机号')
      this.triggerVal()
      return
    }

    /*if (!this.companyInput.value.trim()) {
     alert('公司名称不能为空')
     return
     }*/
    request.post({
      url: '/api/reserve',
      data: {
        from: document.title,
        mobile: true,
        name: this.nameInput.value,
        phone: this.mobileInput.value,
        companyName: this.companyInput.value
      }
    }).then(res => {
      res.status === 500 ? alert(res.message) : alert('预约成功')
      this.nameInput.value = ""
      this.mobileInput.value = ""
      this.companyInput.value = ""
    }).catch(err => {
      console.log(`err======>`, err)
    })

    /* fetch("/api/reserve", {
     method: 'POST',
     credentials: 'include',
     headers: {
     'Content-Type': 'application/json'
     },
     body: JSON.stringify({
     from: document.title,
     mobile: true,
     name: this.nameInput.value,
     phone: this.mobileInput.value,
     companyName: this.companyInput.value
     }),
     timeout: 10000
     }).then(res=> {
     return res.json();
     }).then(data=> {
     data.status === 500 ? alert(data.message) : alert('预约成功')
     this.nameInput.value = ""
     this.mobileInput.value = ""
     this.companyInput.value = ""
     }).catch(err=> {
     console.log(`err======>`, err)
     })*/
  }

  callMobile() {
    window.location.href = "tel:4008755656"
  }

  inputOnFocus() {
    this.triggerVal()
  }

  inputOnBlur() {
    this.triggerVal()
  }

  triggerVal() {
    this.nameInput.value ? this.setState({hasName: true}) : this.setState({hasName: false})
    this.mobileInput.value ? this.setState({hasMobile: true}) : this.setState({hasMobile: false})
  }

  triggerVideo() {
    this.setState({
      showVideo: !this.state.showVideo
    })
  }

  render() {
    return (
      <div className="home">
        {this.state.showVideo ?
          <div className="videos">
            <div className="mask" onClick={this.triggerVideo.bind(this)}></div>
            <video controls="controls" autoPlay="autoPlay" className="video"
                   src="http://oss.kuaihuoyun.com/3tms/m/video/20171128.mp4">
            </video>
          </div> :
          <div></div>}
        <img src={require('@/common/images/home/home_1.png')}/>

        <img className="q_3" src={require('../../common/images/home/home_q_3.png')}
             onClick={this.triggerVideo.bind(this)}/>
        <div className="f_1">观看视频介绍</div>
        <img className="q_4" src={require('../../common/images/home/home_q_4.png')}
             onClick={this.callMobile.bind(this)}/>
        <div className="content_1">
          {this.data.content1.map((item, index)=> {
            return (
              <div key={index}>
                <img src={require('../../common/images/home/' + item.src)}/>
                <div>
                  <div className="title">{item.title}</div>
                  <div className="info">{item.info}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="content_2">
          {this.data.content2.map((item, index) => {
            return (
              <div key={index} className="block">
                {index === 0 ? <img style={{width: '110%', marginLeft: '-5%'}}
                                    src={require('../../common/images/home/' + item.src)}/> :
                  <img src={require('../../common/images/home/' + item.src)}/>}

                <div className="title">{item.title}</div>
                <div className="info">
                  {item.info}
                </div>
                <div className="list">
                  {item.list.map((l, i) => {
                    return (
                      <div key={i} className="item">
                        <img src={require('../../common/images/home/' + l.src)}/>
                        {l.intro}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div id="reserveAnchor" className="content_3">
          <div style={{marginTop: '.86rem', fontSize: '.4rem', color: '#4c59fb', fontWeight: '800'}}>预约个性化演示</div>
          <div style={{fontSize: '.18rem'}}>了解3TMS如何更好的满足您的需求</div>
          <input placeholder="请输入您的姓名" ref={nameInput => this.nameInput = nameInput}
                 style={this.state.hasName ? {} : {border: '1px solid red'}}
                 onBlur={ this.inputOnBlur.bind(this) }
                 onFocus={ this.inputOnFocus.bind(this) }/>
          <input placeholder="请输入您的联系方式" ref={mobileInput => this.mobileInput = mobileInput}
                 style={this.state.hasMobile ? {} : {border: '1px solid red'}}
                 onBlur={ this.inputOnBlur.bind(this) }
                 onFocus={ this.inputOnFocus.bind(this) }/>
          <input placeholder="请输入您的公司名称" ref={companyInput => this.companyInput = companyInput}/>
          <div className="button" onClick={this.toReserve.bind(this)}>
            提交
          </div>
          <img style={{marginTop: '.9rem', width: '2.44rem'}} src={require('../../common/images/home/home_5.png')}/>
          <div style={{marginTop: '.21rem', fontSize: '.24rem', color: '#4c59fb',textAlign: 'center'}}>
            微信搜索【3TMS】或扫描二维码，<br/>
            关注公众号
          </div>
          <img style={{marginTop: '1.06rem', marginBottom: '.86rem', width: '3.85rem'}}
               src={require('../../common/images/home/home_6.png')}
               onClick={this.callMobile.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Home
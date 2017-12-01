/**
 * Created by huzhang on 2017/11/30.
 */
import React, {Component} from 'react'
import Request from '@/common/js/request'

import './index.scss'

const request = new Request()

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reserveDialog: false,
      hasName: true,
      hasMobile: true
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.open === true) {
      this.triggerDialog()
    }
  }


  triggerDialog() {
    let {reserveDialog} = this.state;
    console.log(`resDia`, reserveDialog)
    reserveDialog ?
      setTimeout(()=> {
        document.getElementById('dialog').style.display = 'none'
      }, 400)
      : setTimeout(()=> {
      document.getElementById('dialog').style.display = 'flex'
    }, 500)
    this.setState({
      reserveDialog: !reserveDialog
    })
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
      res.status === 500 ? alert(res.message) :
        (()=> {
          alert('预约成功')
          this.triggerDialog()
          this.nameInput.value = ""
          this.mobileInput.value = ""
          this.companyInput.value = ""
        })()
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


  render() {
    const {reserveDialog, hasName, hasMobile} = this.state
    return (
      <div style={{position: 'absolute'}}>
        <div className="dialog_mask" style={reserveDialog ? {display: 'block'} : {display: 'none'}}
             onClick={this.triggerDialog.bind(this)}>
        </div>
        <div id="dialog" className={reserveDialog ? 'reserve_dialog out_normal' : 'hide_normal reserve_dialog'}
             style={{display: 'none'}}>
          <div className="title">
            <h3>预约个性化演示</h3></div>
          <div className="form-group">
            <input placeholder="请输入您的姓名" ref={nameInput => this.nameInput = nameInput}
                   style={hasName ? {} : {border: '1px solid red'}}
                   onBlur={ this.inputOnBlur.bind(this) }
                   onFocus={ this.inputOnFocus.bind(this) }/>
          </div>
          <div className="form-group">
            <input placeholder="请输入您的联系方式" ref={mobileInput => this.mobileInput = mobileInput}
                   style={hasMobile ? {} : {border: '1px solid red'}}
                   onBlur={ this.inputOnBlur.bind(this) }
                   onFocus={ this.inputOnFocus.bind(this) }/>
          </div>
          <div className="form-group">
            <input placeholder="请输入您的公司名称" ref={companyInput => this.companyInput = companyInput}/>
          </div>
          <div onClick={this.toReserve.bind(this)} className="button">
            提交
          </div>
        </div>
      </div>

    )
  }
}

export default Dialog;
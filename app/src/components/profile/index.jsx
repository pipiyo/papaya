import React, { Component } from 'react'

class ProfilePicture extends Component {

  constructor() {
    super()
  }
  render() {
      return (
                <img src={this.props.user_photo} alt="usuario"/>
      )

  }

}


class ProfileName extends Component {

  constructor() {
    super()
  }
  render() {
      return (
                <h1>{this.props.user_name}</h1>
      )

  }

}





export default class Profile extends Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
            <div className="name-user">
              <ProfileName user_name={this.props.obj.user.full_name} />
            </div>

            <div className="img-user">
              <ProfilePicture user_photo={this.props.obj.user.profile_picture} />
            </div>
      </div>
      )

  }

}
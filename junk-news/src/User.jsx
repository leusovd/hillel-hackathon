import React from "react";

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpened: false
		}
	}

	openMenu() {
		this.setState({isMenuOpened: !this.state.isMenuOpened})
	}

  render() {
    const img = require(`${this.props.data.avatar}`);
    return (
      <div className="user-wrapper">
        <div
					className="user-block"
					onClick={() => this.openMenu()}
				>
          <div className="user-name">{this.props.data.name}</div>
          <div className="user-avatar">
            <img src={img} alt="avatar" />
          </div>
        </div>
				<ul className={`user-menu${this.state.isMenuOpened ? ' active' : ''}`}>
          <li
						className="user-menu__item"
						onClick={() => this.props.onCreateArticle()}						
					>Create article</li>
          <li
						className="user-menu__item"
						onClick={() => this.props.onUserLogout()}
					>Logout</li>
        </ul>
      </div>
    );
  }
}

export default User;
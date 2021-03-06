import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvitedUserCard from '@h5components/InvitedUserCard';
import H5NavBar from '@h5components/H5NavBar';
import '../screen.less';
import apis from '@apis';
import SpinSkeletonContainer from '@components/SpinSkeletonContainer'

export default class InvitedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteesGot: null,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const inviteesGot = await apis.getInvitees({
      token: localStorage.getItem('token'),
    });
    console.log('inviteesGot: ', inviteesGot);
    const tempArr = [];
    for (let i = 0; i < 100; i++) {
      tempArr.push(inviteesGot[0]);
    }
    this.setState({
      inviteesGot: tempArr
    });
  }

  render() {
    const { inviteesGot } = this.state;

    return (
      <div>
        <H5NavBar text="受邀用户" />
        <div className="content-container">
          <SpinSkeletonContainer dataSrc={inviteesGot}>
            {
              inviteesGot
              && (
                inviteesGot.map(ele => <InvitedUserCard nickname={ele.nickname} avatarUrl={ele.avatarUrl} />)
              )
            }
          </SpinSkeletonContainer>
        </div>
      </div>
    );
  }
}

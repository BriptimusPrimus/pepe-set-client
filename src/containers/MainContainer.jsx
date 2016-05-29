import { connect } from 'react-redux';
import MainView from '../components/MainView';

const mapStateToProps = (state) => {
  return {
    waitingForResponse: state.waitingForResponse,
    userData: state.userData,
    activationData: state.activationData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetGoogleAuthClick: () => {
      console.log('onSetGoogleAuthClick');
    },
    onActivateGoogleAuthClick: () => {
      console.log('onActivateGoogleAuthClick');
    },
    onGoogleAuthLoginClick: () => {
      console.log('onGoogleAuthLoginClick');
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)

export default MainContainer

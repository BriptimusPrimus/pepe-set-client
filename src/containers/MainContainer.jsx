import { connect } from 'react-redux';
import MainView from '../components/MainView';
import {constants} from '../lib/constants'
import {setAuthenticationMethod, receiveActivationData} from '../actions';

export default function MainContainerFactory(pepeSetService) {

  const getGoogleActivationData = (dispatch) => {
    pepeSetService.getGoogleSoftAuth()
      .then(function fullfilled(data) {
        dispatch(receiveActivationData(data.activationData));
      })
      .catch(function rejected(reason) {
        dispatch(receiveActivationData(reason));
        console.log('response error:', reason);
      })  
  }

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
        dispatch(setAuthenticationMethod(constants.authTypes.GOOGLE_AUTH));
        getGoogleActivationData(dispatch);
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

  return MainContainer

}

import { connect } from 'react-redux';
import MainView from '../components/MainView';
import {constants} from '../lib/constants'
import {  
  setAuthenticationMethod,
  receiveActivationData,
  activateGoogleAuth,
  activateGoogleAuthSuccess,
  activateGoogleAuthError,
} from '../actions';

export default function MainContainerFactory(pepeSetService) {

  const getGoogleActivationDataHandler = (dispatch) => {
    pepeSetService.getGoogleSoftAuth()
      .then(function fullfilled(data) {
        dispatch(receiveActivationData(data.activationData));
      })
      .catch(function rejected(reason) {
        console.log('response error:', reason);
        dispatch(receiveActivationData(reason));        
      })  
  }
  
  const activateGoogleAuthHandler = (dispatch, otpCode) => {
    pepeSetService.postActivateGoogleAuth(otpCode)
      .then(function fullfilled(data) {        
        dispatch(activateGoogleAuthSuccess(data.userData));
      })
      .catch(function rejected(reason) {
        console.log('response error:', reason);
        dispatch(activateGoogleAuthError(reason));
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
        dispatch(setAuthenticationMethod(constants.authTypes.GOOGLE_AUTH));
        getGoogleActivationDataHandler(dispatch);
      },
      onActivateGoogleAuthClick: (otpCode) => {
        console.log('onActivateGoogleAuthClick');
        dispatch(activateGoogleAuth());
        activateGoogleAuthHandler(dispatch, otpCode);
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

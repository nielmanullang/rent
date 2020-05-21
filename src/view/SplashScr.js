import { View } from "native-base";
import React from "react";
import { Image, StatusBar } from "react-native";
import splash from "./../assets/images/splash.png";
import {
  apiCall,
  getAsyncStoreLoad,
  getAsyncStoreSave,
  resetNavigation,
} from "./../redux/actions/commonAction";
import endPoint from "./../redux/service/endPoint";

class SplashScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    accessToken: "",
    dataUser: null,
  };

  componentDidMount = () => {
    setTimeout(() => {
      getAsyncStoreLoad("dataUser", this.getTokenFromStorage);
    }, 2000);
  };

  getTokenFromStorage = (dataUser) => {
    if (dataUser != null) {
      if (dataUser.accessToken == null || dataUser.accessToken == undefined) {
        getAsyncStoreSave("dataUser", null, () =>
          resetNavigation("WelcomeLogin", this.props.navigation)
        );
      }
      this.setState({ dataUser, accessToken: dataUser.accessToken });
      let api = null;
      if (dataUser.typeUser == "RENTER") {
        api = endPoint.getDetailCustomer + "/" + dataUser.id;
      } else {
        api = endPoint.getDetailVendor + "/" + dataUser.id;
      }
      let header = { headers: { "Content-Type": "application/json" } };
      this.setState({ dataUser }, () => {
        apiCall.get(api, header, this.getAccountPersonal);
      });
    } else {
      resetNavigation("WelcomeLogin", this.props.navigation);
    }
  };

  getAccountPersonal = (callback) => {
    if (callback != null && callback.data.message == "OK") {
      getAsyncStoreSave("personalData", callback.data.result, () => {
        this.state.dataUser.typeUser == "RENTER"
          ? resetNavigation("CustomerIndex", this.props.navigation)
          : resetNavigation("ProviderIndex", this.props.navigation);
      });
    } else {
      resetNavigation("WelcomeLogin", this.props.navigation);
    }
  };

  render() {
    return (
      <View>
        <StatusBar hidden />
        <Image
          source={splash}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
    );
  }
}

export default SplashScreen;

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
    token: "",
    dataUser: null,
  };

  componentDidMount = () => {
    setTimeout(() => {
      getAsyncStoreLoad("dataUser", this.getTokenFromStorage);
    }, 2000);
  };

  getTokenFromStorage = (dataUser) => {
    if (dataUser != null) {
      if (dataUser.token == null || dataUser.token == undefined) {
        getAsyncStoreSave("dataUser", null, () =>
          resetNavigation("Welcome", this.props.navigation)
        );
      }
      this.setState({ token: dataUser.token });
      const api = endPoint.getDetailUser + "?token=" + dataUser.token;
      const header = { headers: { "Content-Type": "application/json" } };
      this.setState({ dataUser }, () => {
        apiCall.get(api, header, this.getAccountPersonal);
      });
    } else {
      resetNavigation("Welcome", this.props.navigation);
    }
  };

  getAccountPersonal = (callback) => {
    if (callback != null && callback.data.status == "OK") {
      getAsyncStoreSave("personalData", callback.data.data, () => {
        callback.data.data.role == "RENTER"
          ? resetNavigation("CustomerIndex", this.props.navigation)
          : resetNavigation("ProviderIndex", this.props.navigation);
      });
    } else {
      resetNavigation("Welcome", this.props.navigation);
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

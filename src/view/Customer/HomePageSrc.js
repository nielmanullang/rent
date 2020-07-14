import { Container, Content, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar } from "react-native";
import Product from "./../../components/Item/Product";
import ItemGroup from "./../../components/Item/ItemGroup";
import Toast from "./../../components/Toast";
import { apiCall, getAsyncStoreLoad } from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class HomePageScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };
  state = {
    dataUser: null,
    personalData: null,
    listVehicles: [],
    listHeader: [],
  };

  componentDidMount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
    getAsyncStoreLoad("personalData", this.getPersonalData);
  };

  getDataUser = (dataUser) => {
    if (dataUser && dataUser.role === "RENTER") {
      this.getListVehicles();
    }
    this.setState({ dataUser });
  };

  getListVehicles = () => {
    let api = endPoint.vehicles;
    let header = { headers: { "Content-Type": "application/json" } };
    apiCall.get(api, header, this.responeListVehicles);
  };

  responeListVehicles = (callback) => {
    if (callback != null && callback.data && callback.data.data) {
      this.setState({ listVehicles: callback.data.data });
    }
  };

  getPersonalData = (personalData) => {
    this.setState({ personalData });
  };

  _actionDetail = (data) => {
    this.props.navigation.push("ProductDetail", { data: data });
  };

  _actionItemGroup = (screen) => {
    if (screen != "") {
      this.props.navigation.navigate(screen);
    } else {
      this.refs.defaultToastBottom.ShowToastFunction("Under Development");
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content>
          <View style={{ padding: 15 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.listHeader.map((data, i) => {
                return (
                  <ItemGroup
                    key={i}
                    item={data}
                    _actionItemGroup={this._actionItemGroup}
                  />
                );
              })}
            </View>
            <View
              horizontalRow
              horizontal={true}
              style={{
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.listVehicles.map((data, i) => {
                return (
                  <Product
                    key={i}
                    item={data}
                    _actionDetail={this._actionDetail}
                  />
                );
              })}
            </View>
          </View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default HomePageScreen;

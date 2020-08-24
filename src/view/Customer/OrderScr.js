import moment from "moment";
import { Container, Content, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar, RefreshControl } from "react-native";
import { colorPrimary } from "./../../../app.json";
import Toast from "./../../components/Toast";
import { apiCall, getAsyncStoreLoad } from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class ChatScreen extends React.Component {
  static navigationOptions = { header: null };
  state = {
    dataUser: null,
    personalData: null,
    listTransactions: [],
    isRefreshing: false,
  };

  componentDidMount = () => {
    console.log("componentDidMount");
    getAsyncStoreLoad("dataUser", this.getDataUser);
    getAsyncStoreLoad("personalData", this.getPersonalData);
  };

  getDataUser = (dataUser) => {
    this.setState({ dataUser }, () => {
      this.getListTransactions();
    });
  };

  getListTransactions = () => {
    const dataUser = this.state.dataUser;
    const api = endPoint.indexRenter + "?token=" + dataUser.token;
    let header = { headers: { "Content-Type": "application/json" } };
    apiCall.get(api, header, this.responeListTransactions);
  };

  responeListTransactions = (callback) => {
    console.log("callback12", callback);
    if (callback != null && callback.data && callback.data.data) {
      this.setState({
        listTransactions: callback.data.data,
        isRefreshing: false,
      });
    } else {
      this.setState({ isRefreshing: false });
    }
  };

  getPersonalData = (personalData) => {
    this.setState({ personalData });
  };

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.getListTransactions();
  };

  render() {
    const listTransactions = this.state.listTransactions;
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              title="Loading..."
            />
          }
        >
          <View>
            {listTransactions && listTransactions.length > 0 ? (
              listTransactions.map((data, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 10,
                      margin: 10,
                    }}
                  >
                    <Text>{data.plat}</Text>
                    <Text>
                      {moment(data.tanggal_awal).format("DD-MM-YYYY") +
                        " s/d " +
                        moment(data.tanggal_akhir).format("DD-MM-YYYY")}
                    </Text>
                    <Text>{data.total_biaya}</Text>
                    <Text>
                      {data.status === "REQUEST"
                        ? "WAITING FOR APPROVAL"
                        : data.status}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  backgroundColor: colorPrimary,
                  padding: 10,
                  margin: 10,
                }}
              >
                <Text>
                  Anda belum memiliki list transaksi, silahkan bertansaksi
                </Text>
              </View>
            )}
          </View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default ChatScreen;

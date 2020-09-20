import moment from "moment";
import { Container, Content, Text, View } from "native-base";
import React from "react";
import {
  Dimensions,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { colorPrimary } from "./../../../app.json";
import Toast from "./../../components/Toast";
import Map from "../../components/Modal/Map";
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
    isVisibleLoading: false,
    modalMap: false,
    item: null,
  };

  componentDidMount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
    getAsyncStoreLoad("personalData", this.getPersonalData);
  };

  componentWillUnmount = () => {
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
    const api =
      endPoint.indexProvider + "?token=" + dataUser.token + "&status=APPROVE";
    let header = { headers: { "Content-Type": "application/json" } };
    apiCall.get(api, header, this.responeListTransactions);
  };

  responeListTransactions = (callback) => {
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

  _submitForm = (id, status) => {
    this.setState({ isVisibleLoading: true });
    const dataUser = this.state.dataUser;
    const api =
      endPoint.approvalProvider + "/" + id + "?token=" + dataUser.token;
    const data = {
      status: status,
    };
    const header = {
      headers: { "Content-Type": "application/json" },
    };
    apiCall.put(api, data, this.getResponseReg, header);
  };

  getResponseReg = (callback) => {
    if (callback != null && callback.data.status == "OK") {
      this.refs.defaultToastBottom.ShowToastFunction(
        "Transaksi berhasil Close"
      );
      this.getListTransactions();
    } else if (callback != null) {
      this.setState({ isVisibleLoading: false }, () => {
        this.refs.defaultToastBottom.ShowToastFunction(callback.data.message);
      });
    }
    this.setState({ isVisibleLoading: false });
  };

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.getListTransactions();
  };

  _isVisibleModalMap = (visible, item) => {
    this.setState({ modalMap: visible, item });
  };

  render() {
    const { listTransactions, item, modalMap, isRefreshing } = this.state;
    return (
      <Container>
        <StatusBar hidden={true} />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
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
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: colorPrimary,
                      padding: 10,
                      margin: 10,
                    }}
                  >
                    <View>
                      <Text>{data.plat}</Text>
                      <Text>
                        {moment(data.tanggal_awal).format("DD-MM-YYYY") +
                          " s/d " +
                          moment(data.tanggal_akhir).format("DD-MM-YYYY")}
                      </Text>
                      <Text>{data.total_biaya}</Text>
                      <Text>{data.status}</Text>
                    </View>
                    <View
                      key={i}
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this._isVisibleModalMap(true, data)}
                        style={{
                          padding: 5,
                          marginLeft: 30,
                          backgroundColor: "grey",
                          width: 100,
                          borderColor: "black",
                          borderWidth: 3,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "black" }}>
                          Map
                        </Text>
                      </TouchableOpacity>
                      <View />
                      <TouchableOpacity
                        onPress={() => this._submitForm(data.id, "CLOSE")}
                        style={{
                          marginTop: 10,
                          padding: 5,
                          marginLeft: 30,
                          width: 100,
                          backgroundColor: "grey",
                          borderColor: "black",
                          borderWidth: 3,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "black" }}>
                          Close Order
                        </Text>
                      </TouchableOpacity>
                    </View>
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
                  Anda belum memiliki list transaksi approve yang sedang aktif
                </Text>
              </View>
            )}
          </View>
        </Content>
        {item && (
          <Map
            item={item}
            modalVisible={modalMap}
            _isVisible={this._isVisibleModalMap}
          />
        )}
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default ChatScreen;

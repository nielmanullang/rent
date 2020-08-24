import moment from "moment";
import { Container, Content, Header, Icon, Text, View } from "native-base";
import React from "react";
import { Dimensions, Image, StatusBar, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { moderateScale } from "../../../native-base-theme/variables/fonts";
import Loading from "../../components/Modal/Loading";
import {
  colorBlack,
  colorGreyDark,
  colorGreylight,
  colorPrimary,
} from "./../../../app.json";
import { convertNumber } from "./../../../native-base-theme/variables/convert";
import Toast from "./../../components/Toast";
import { apiCall, getAsyncStoreLoad } from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const WIDTH2 = Dimensions.get("window").width - 100;
class ProductDetailScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    dataUser: null,
    personalData: null,
    productDetail: null,
    listOfProductExclude: [],
    activeSlide: 0,
    tanggalAwal: null,
    tanggalAkhir: null,
    isDateStartPickerVisible: false,
    isDateEndPickerVisible: false,
    isVisibleLoading: false,
  };

  componentDidMount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
    getAsyncStoreLoad("personalData", this.getPersonalData);
  };

  getDataUser = (dataUser) => {
    this.setState({ dataUser }, () => {
      this.getProductDetail();
    });
  };

  getPersonalData = (personalData) => {
    this.setState({ personalData });
  };

  getProductDetail = () => {
    let data = this.props.navigation.state.params.data;
    let api = endPoint.vehicles + "/" + data.id;
    let header = { headers: { "Content-Type": "application/json" } };
    apiCall.get(api, header, this.responeProductDetail);
  };

  responeProductDetail = (callback) => {
    if (callback != null && callback.data) {
      this.setState({ productDetail: callback.data });
    }
  };

  _actionDetail = (data) => {
    this.props.navigation.push("ProductDetail", { data: data });
  };

  _renderItem({ item }) {
    console.log("item", item);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "FFF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: item }}
          style={{ width: WIDTH, height: 275, resizeMode: "contain", flex: 1 }}
        />
      </View>
    );
  }

  _showDateStartPicker = () =>
    this.setState({ isDateStartPickerVisible: true });

  _hideDateStartPicker = () =>
    this.setState({ isDateStartPickerVisible: false });

  _showDateEndPicker = () => this.setState({ isDateEndPickerVisible: true });

  _hideDateEndPicker = () => this.setState({ isDateEndPickerVisible: false });

  _handleDateStartPicked = (date) => {
    let tanggalAwal = this.state.tanggalAwal;
    tanggalAwal = moment(date).format("YYYY-MM-DD");
    this.setState({ tanggalAwal });
    this._hideDateStartPicker();
  };

  _handleDateEndPicked = (date) => {
    let tanggalAkhir = this.state.tanggalAkhir;
    tanggalAkhir = moment(date).format("YYYY-MM-DD");
    this.setState({ tanggalAkhir });
    this._hideDateEndPicker();
  };

  _submitForm = () => {
    this.setState({ isVisibleLoading: true });
    const dataUser = this.state.dataUser;
    const api = endPoint.transactionsCreate + "?token=" + dataUser.token;
    const productDetail = this.state.productDetail;
    const count = moment(this.state.tanggalAwal).diff(
      moment(this.state.tanggalAkhir),
      "days"
    );
    const data = {
      tanggal_awal: this.state.tanggalAwal,
      tanggal_akhir: this.state.tanggalAkhir,
      biaya_perhari: productDetail.harga,
      total_hari: count,
      total_biaya: count * productDetail.harga,
      status: "REQUEST",
      vehicle_id: productDetail.id,
    };
    const header = {
      headers: { "Content-Type": "application/json" },
    };
    console.log("data", data);
    apiCall.post(api, data, this.getResponseReg, header);
  };

  getResponseReg = (callback) => {
    console.log("callback", callback);
    if (callback != null && callback.data.status == "OK") {
      this.refs.defaultToastBottom.ShowToastFunction("Transaksi berhasil");
      setTimeout(() => {
        this.setState({ isVisibleLoading: false }, () => {
          this.props.navigation.goBack();
        });
      }, 1200);
    } else if (callback != null) {
      this.setState({ isVisibleLoading: false }, () => {
        this.refs.defaultToastBottom.ShowToastFunction(callback.data.message);
      });
    }
    this.setState({ isVisibleLoading: false });
  };

  renderButton = () => {
    let tanggalAwal = this.state.tanggalAwal;
    let tanggalAkhir = this.state.tanggalAkhir;
    if (
      tanggalAwal != null &&
      tanggalAwal != "" &&
      tanggalAkhir != null &&
      tanggalAkhir != ""
    ) {
      return (
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              borderColor: colorGreyDark,
              borderWidth: 2.5,
              width: WIDTH2 / 2,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              right: 0,
              backgroundColor: colorPrimary,
            }}
            onPress={() => this._submitForm()}
          >
            <Text bold style={{ color: colorBlack }}>
              Order
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingRight: 10,
          }}
        >
          <View
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              borderColor: colorGreyDark,
              borderWidth: 2.5,
              width: WIDTH2 / 2,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              right: 0,
              backgroundColor: colorGreylight,
            }}
          >
            <Text bold style={{ color: colorBlack }}>
              Order
            </Text>
          </View>
        </View>
      );
    }
  };

  render() {
    let renderProduct = null;
    let productDetail = this.state.productDetail;
    let rating = [];
    let j;
    if (productDetail != null) {
      console.log("productDetail.gambar", productDetail.gambar);
      const datas = [];
      datas.push(productDetail.gambar);
      if (productDetail.rating !== undefined && productDetail.rating !== null) {
        for (j = 0; j < 5; j++) {
          if (j < productDetail.rating) {
            rating.push({
              picked: true,
            });
          } else {
            rating.push({
              picked: false,
            });
          }
        }
      } else {
        for (j = 0; j < 5; j++) {
          rating.push({
            picked: false,
          });
        }
      }
      renderProduct = (
        <View style={{ padding: 0 }}>
          <Carousel
            ref={"carousel"}
            layout={"default"}
            data={datas}
            renderItem={this._renderItem}
            sliderWidth={WIDTH}
            itemWidth={WIDTH}
            loop={true}
            enableSnap={true}
            firstItem={0}
            fadeDuration={0}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            style={{
              padding: 0,
              margin: 0,
              shadowOffset: { width: 1, height: 1 },
              shadowColor: "grey",
              shadowOpacity: 0.2,
            }}
          />
          <Pagination
            dotsLength={1}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              backgroundColor: "transparent",
              position: "absolute",
              top: 150,
              left: WIDTH2 / 2,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colorPrimary,
            }}
            inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#000000",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Text style={{ marginLeft: 10 }}>
            {"Jenis Mobil : " + productDetail.jenis}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"Kapasitas Mobil : " + productDetail.kapasitas}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"Plat : " + productDetail.plat}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"Harga Perhari : Rp. " + convertNumber(productDetail.harga)}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginLeft: 10 }}>{"Tanggal Rental"}</Text>
            <TouchableOpacity onPress={this._showDateStartPicker}>
              {this.state.tanggalAwal == null ? (
                <Text
                  horizontalColumn
                  style={{
                    color: "#868686",
                    fontSize: moderateScale(15),
                    paddingRight: 15,
                  }}
                >
                  Pilih Tanggal Rental
                </Text>
              ) : (
                <Text horizontalColumn style={{ marginRight: 15 }}>
                  {moment(this.state.tanggalAwal).format("DD-MM-YYYY")}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
              minimumDate={new Date()}
              isVisible={this.state.isDateStartPickerVisible}
              onConfirm={this._handleDateStartPicked}
              onCancel={this._hideDateStartPicker}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginLeft: 10 }}>{"Tanggal Selesai"}</Text>
            <TouchableOpacity
              onPress={this._showDateEndPicker}
              disabled={this.state.tanggalAwal == null}
            >
              {this.state.tanggalAkhir == null ? (
                <Text
                  horizontalColumn
                  style={{
                    color: "#868686",
                    fontSize: moderateScale(15),
                    paddingRight: 15,
                  }}
                >
                  Pilih Tanggal Selesai
                </Text>
              ) : (
                <Text horizontalColumn style={{ marginRight: 15 }}>
                  {moment(this.state.tanggalAkhir).format("DD-MM-YYYY")}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
              minimumDate={new Date(this.state.tanggalAwal)}
              isVisible={this.state.isDateEndPickerVisible}
              onConfirm={this._handleDateEndPicked}
              onCancel={this._hideDateEndPicker}
            />
          </View>
          {this.renderButton()}
        </View>
      );
    }

    return (
      <Container>
        <StatusBar hidden={true} />
        <Header>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, paddingLeft: 15 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Icon name="arrow-back" style={{ color: colorBlack }} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 8,
                paddingRight: 10,
                height: "100%",
                justifyContent: "center",
              }}
            >
              {productDetail != null && (
                <Text
                  style={{
                    color: colorBlack,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  {productDetail.plat}
                </Text>
              )}
            </View>
          </View>
        </Header>
        <Content>
          <View style={{ padding: 0 }}>{renderProduct}</View>
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
        <Loading isVisible={this.state.isVisibleLoading} />
      </Container>
    );
  }
}

export default ProductDetailScreen;

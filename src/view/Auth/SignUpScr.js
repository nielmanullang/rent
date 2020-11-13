import moment from "moment";
import { Container, Content, Header, Icon, Text, View } from "native-base";
import React from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { moderateScale } from "../../../native-base-theme/variables/fonts";
import FormText from "../../components/Form/Text";
import Loading from "../../components/Modal/Loading";
import {
  colorBlack,
  colorGreyDark,
  colorGreylight,
  colorPrimary,
} from "./../../../app.json";
import { convertToLetterCase } from "./../../../native-base-theme/variables/convert";
import Toast from "./../../components/Toast";
import { apiCall, resetNavigation } from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH2 = Dimensions.get("window").width - 100;

class SignUpScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    isVisibleLoading: false,
    formItem: {
      alamat: null,
      email: null,
      fullName: null,
      password: null,
      phone: null,
      ktp: null,
      tanggalLahir: null,
      username: null,
    },
    isDateTimePickerVisible: false,
  };

  _submitForm = () => {
    this.setState({ isVisibleLoading: true });
    const formItem = this.state.formItem;
    const api = endPoint.register;
    const data = {
      username: formItem.username,
      password: formItem.password,
      email: formItem.email,
      no_hp: formItem.phone,
      no_ktp: formItem.ktp,
      name: formItem.fullName,
      alamat: formItem.alamat,
      tanggalLahir: formItem.tanggalLahir,
      role: "RENTER",
    };
    const header = {
      headers: { "Content-Type": "application/json" },
    };
    apiCall.post(api, data, this.getResponseReg, header);
  };

  getResponseReg = (callback) => {
    if (callback != null && callback.data.status == "OK") {
      this.refs.defaultToastBottom.ShowToastFunction(
        "Data berhasil diregister, silahkan login"
      );
      setTimeout(() => {
        this.setState({ isVisibleLoading: false }, () => {
          resetNavigation("Login", this.props.navigation);
        });
      }, 1200);
    } else if (callback != null) {
      this.setState({ isVisibleLoading: false }, () => {
        this.refs.defaultToastBottom.ShowToastFunction(callback.data.message);
      });
    }
    this.setState({ isVisibleLoading: false });
  };

  _changeFullName = (value) => {
    let formItem = this.state.formItem;
    formItem.fullName = value;
    this.setState({ formItem });
  };

  _changeUsername = (value) => {
    let formItem = this.state.formItem;
    formItem.username = value;
    this.setState({ formItem });
  };

  _changeEmail = (value) => {
    let formItem = this.state.formItem;
    formItem.email = value;
    this.setState({ formItem });
  };

  _changeTanggalLahir = (value) => {
    let formItem = this.state.formItem;
    formItem.tanggalLahir = value;
    this.setState({ formItem });
  };

  _changePhone = (value) => {
    let formItem = this.state.formItem;
    formItem.phone = value;
    this.setState({ formItem });
  };

  _changeKTP = (value) => {
    let formItem = this.state.formItem;
    formItem.ktp = value;
    this.setState({ formItem });
  };

  _changeAlamat = (value) => {
    let formItem = this.state.formItem;
    formItem.alamat = value;
    this.setState({ formItem });
  };

  _changePassword = (value) => {
    let formItem = this.state.formItem;
    formItem.password = value;
    this.setState({ formItem });
  };

  renderButton = () => {
    let formItem = this.state.formItem;
    if (
      formItem.alamat != null &&
      formItem.alamat != "" &&
      formItem.email != null &&
      formItem.email != "" &&
      formItem.password != null &&
      formItem.password != "" &&
      formItem.ktp != null &&
      formItem.ktp != "" &&
      formItem.fullName != null &&
      formItem.fullName != "" &&
      formItem.phone != null &&
      formItem.phone != "" &&
      formItem.tanggalLahir != null &&
      formItem.tanggalLahir != "" &&
      formItem.username != null &&
      formItem.username != ""
    ) {
      return (
        <View
          style={{
            justifyContent: "flex-end",
            alignContent: "flex-end",
            alignItems: "flex-end",
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              paddingTop: 20,
              paddingBottom: 20,
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
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: "flex-end",
            alignContent: "flex-end",
            alignItems: "flex-end",
            paddingRight: 10,
          }}
        >
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
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
              SUBMIT
            </Text>
          </View>
        </View>
      );
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    let formItem = this.state.formItem;
    formItem.tanggalLahir = moment(date).format("YYYY-MM-DD");
    this.setState({ formItem });
    this._hideDateTimePicker();
  };

  render() {
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
            <View style={{ flex: 1, paddingLeft: 10 }}>
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
              <Text
                style={{ color: colorBlack, fontSize: 22, fontWeight: "bold" }}
              >
                SIGN UP
              </Text>
            </View>
          </View>
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: colorGreyDark, fontSize: 40, marginBottom: 10 }}
              >
                Sign Up
              </Text>
              <Text style={{ color: colorGreyDark, fontSize: 20 }}>
                {convertToLetterCase("Renter")}
              </Text>
            </View>
            <View>
              <FormText
                item={{
                  placeholder: "Full Name",
                  value: this.state.formItem.fullName,
                }}
                changeText={this._changeFullName}
              />
            </View>
            <View>
              <FormText
                item={{
                  placeholder: "User Name",
                  value: this.state.formItem.username,
                }}
                changeText={this._changeUsername}
              />
            </View>
            <View>
              <FormText
                type="email-address"
                item={{
                  placeholder: "Email",
                  value: this.state.formItem.email,
                }}
                changeText={this._changeEmail}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingLeft: 10,
                paddingBottom: 15,
                borderWidth: 1,
                borderColor: "#000000",
                borderRadius: 10,
                marginLeft: 15,
                marginRight: 15,
                paddingTop: 10,
              }}
            >
              <TouchableOpacity onPress={this._showDateTimePicker}>
                {this.state.formItem.tanggalLahir == null ? (
                  <Text
                    horizontalColumn
                    style={{
                      color: "#868686",
                      fontSize: moderateScale(15),
                      paddingTop: 5,
                    }}
                  >
                    Tanggal Lahir
                  </Text>
                ) : (
                  <Text horizontalColumn>
                    {moment(this.state.formItem.tanggalLahir).format(
                      "DD-MM-YYYY"
                    )}
                  </Text>
                )}
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>
            <View>
              <FormText
                type="numeric"
                item={{
                  placeholder: "No. HP",
                  value: this.state.formItem.phone,
                }}
                changeText={this._changePhone}
              />
            </View>
            <View>
              <FormText
                type="numeric"
                item={{
                  placeholder: "No. KTP",
                  value: this.state.formItem.ktp,
                }}
                changeText={this._changeKTP}
              />
            </View>
            <View>
              <FormText
                item={{
                  placeholder: "Alamat",
                  value: this.state.formItem.alamat,
                }}
                changeText={this._changeAlamat}
              />
            </View>
            <View>
              <FormText
                item={{
                  placeholder: "Password",
                  value: this.state.formItem.password,
                }}
                changeText={this._changePassword}
              />
            </View>
          </View>
          {this.renderButton()}
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
        <Loading isVisible={this.state.isVisibleLoading} />
      </Container>
    );
  }
}

export default SignUpScreen;

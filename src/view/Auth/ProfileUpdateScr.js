import moment from "moment";
import {
  Container,
  Content,
  Header,
  Icon,
  Picker,
  Text,
  View,
} from "native-base";
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
import Toast from "./../../components/Toast";
import { apiCall, getAsyncStoreLoad } from "./../../redux/actions/commonAction";
import endPoint from "./../../redux/service/endPoint";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH2 = Dimensions.get("window").width - 100;

class ProfileUpdateScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    isVisibleLoading: false,
    formItem: {
      alamat: null,
      email: null,
      fullName: null,
      jenisKelamin: null,
      kabupaten: null,
      kecamatan: null,
      phone: null,
      provinsi: null,
      tanggalLahir: null,
      username: null,
      confirmPassword: null,
    },
    listProvinsi: [],
    listKabupaten: [],
    listKecamatan: [],
    listJenisKelamin: [
      {
        text: "LAKI-LAKI",
        value: "LAKI-LAKI",
      },
      {
        text: "PEREMPUAN",
        value: "PEREMPUAN",
      },
    ],
    dataUser: null,
    personalData: null,
    isDateTimePickerVisible: false,
  };

  componentDidMount = () => {
    getAsyncStoreLoad("dataUser", this.getDataUser);
    this.getListProvinsi();
  };

  getDataUser = (dataUser) => {
    this.setState({ dataUser }, () => {
      this.getDetailProfile(dataUser);
    });
  };

  getDetailProfile = (dataUser) => {
    let api = null;
    if (dataUser.typeUser == "RENTER") {
      api = endPoint.getDetailCustomer + "/" + dataUser.id;
    } else {
      api = endPoint.getDetailVendor + "/" + dataUser.id;
    }
    let header = { headers: { "Content-Type": "application/json" } };
    apiCall.get(api, header, this.getAccountPersonal);
  };

  getAccountPersonal = (callback) => {
    if (callback != null && callback.data.message == "OK") {
      let dataUser = this.state.dataUser;
      let formItem = this.state.formItem;
      let personalData = callback.data.result;
      formItem.alamat = personalData.alamat;
      formItem.email = personalData.email;
      formItem.fullName =
        dataUser.typeUser == "RENTER"
          ? personalData.customerName
          : personalData.vendorName;
      formItem.jenisKelamin = personalData.jenisKelamin;
      formItem.kabupaten = personalData.kabupaten.id;
      formItem.kecamatan = personalData.kecamatan.id;
      formItem.phone = personalData.phone;
      formItem.provinsi = personalData.provinsi.id;
      formItem.tanggalLahir = personalData.tanggalLahir;
      formItem.username = personalData.username;
      this.setState({ personalData, formItem }, () => {
        this.getListKabupaten(personalData.provinsi.id);
        this.getListKecamatan(personalData.kabupaten.id);
      });
    }
  };

  getListProvinsi = () => {
    const api = endPoint.getListProvinsi + "?limit=50";
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
    };
    apiCall.get(api, header, this.responeListProvinsi);
  };

  responeListProvinsi = (callback) => {
    if (callback.data.message == "OK") {
      let listProvinsi = callback.data.result;
      this.setState({ listProvinsi });
    }
  };

  _submitForm = () => {
    this.setState({ isVisibleLoading: true });
    let formItem = this.state.formItem;
    let dataUser = this.state.dataUser;
    let personalData = this.state.personalData;
    let api = null;
    let data;
    if (dataUser.typeUser == "RENTER") {
      api = endPoint.updateCustomer;
      data = {
        id: dataUser.id,
        alamat: formItem.alamat,
        email: formItem.email,
        customerName: formItem.fullName,
        jenisKelamin: formItem.jenisKelamin,
        kabupatenId: formItem.kabupaten,
        kecamatanId: formItem.kecamatan,
        password: formItem.password,
        phone: formItem.phone,
        provinsiId: formItem.provinsi,
        tanggalLahir: formItem.tanggalLahir,
        username: formItem.username,
      };
    } else {
      api = endPoint.updateVendor;
      data = {
        id: dataUser.id,
        alamat: formItem.alamat,
        email: formItem.email,
        vendorName: formItem.fullName,
        jenisKelamin: formItem.jenisKelamin,
        kabupatenId: formItem.kabupaten,
        kecamatanId: formItem.kecamatan,
        password: formItem.password,
        phone: formItem.phone,
        provinsiId: formItem.provinsi,
        tanggalLahir: formItem.tanggalLahir,
        username: formItem.username,
      };
    }
    const header = {
      headers: { "Content-Type": "application/json" },
    };
    apiCall.put(api, data, this.getResponseReg, header);
  };

  getResponseReg = (callback) => {
    if (callback != null && callback.data.message == "OK") {
      this.refs.defaultToastBottom.ShowToastFunction("Data Berhasil diupdate");
      setTimeout(() => {
        this.setState({ isVisibleLoading: false }, () => {
          this.props.navigation.goBack();
        });
      }, 1200);
    } else if (callback != null) {
      this.setState({ isVisibleLoading: false }, () => {
        this.refs.defaultToastBottom.ShowToastFunction(callback.data.result);
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

  _changeJenisKelamin = (value) => {
    let formItem = this.state.formItem;
    formItem.jenisKelamin = value;
    this.setState({ formItem });
  };

  _changeAlamat = (value) => {
    let formItem = this.state.formItem;
    formItem.alamat = value;
    this.setState({ formItem });
  };

  onValueChangeProvinsi(value) {
    if (value !== 0 && value !== "0") {
      let formItem = this.state.formItem;
      formItem.provinsi = value;
      formItem.kecamatan = null;
      this.setState({ formItem }, () => {
        this.getListKabupaten(value);
      });
    }
  }

  getListKabupaten = (provinsi) => {
    const api =
      endPoint.getListKabupaten + "?provinsiId=" + provinsi + "&limit=100";
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
    };
    apiCall.get(api, header, this.responeListKabupaten);
  };

  responeListKabupaten = (callback) => {
    if (callback.data.message == "OK") {
      let listKabupaten = callback.data.result;
      this.setState({ listKabupaten });
    } else {
      let listKabupaten = [];
      let formItem = this.state.formItem;
      formItem.kabupaten = null;
      formItem.kecamatan = null;
      this.setState({ listKabupaten, formItem });
    }
  };

  onValueChangeKabupaten(value) {
    if (value !== 0 && value !== "0") {
      let formItem = this.state.formItem;
      formItem.kabupaten = value;
      this.setState({ formItem }, () => {
        this.getListKecamatan(value);
      });
    }
  }

  getListKecamatan = (kabupaten) => {
    const api = endPoint.getListKecamatan + "?kabupatenId=" + kabupaten;
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
    };
    apiCall.get(api, header, this.responeListKecamatan);
  };

  responeListKecamatan = (callback) => {
    if (callback.data.message == "OK") {
      let listKecamatan = callback.data.result;
      this.setState({ listKecamatan });
    } else {
      let listKecamatan = [];
      let formItem = this.state.formItem;
      formItem.kecamatan = null;
      this.setState({ listKecamatan, formItem });
    }
  };

  onValueChangeKecamatan(value) {
    if (value !== 0 && value !== "0") {
      let formItem = this.state.formItem;
      formItem.kecamatan = value;
      this.setState({ formItem });
    }
  }

  onValueChangeJenisKelamin(value) {
    if (value !== 0 && value !== "0") {
      let formItem = this.state.formItem;
      formItem.jenisKelamin = value;
      this.setState({ formItem });
    }
  }

  renderButton = () => {
    let formItem = this.state.formItem;
    if (
      (formItem.alamat != null && formItem.alamat != "") ||
      (formItem.email != null && formItem.email != "") ||
      (formItem.fullName != null && formItem.fullName != "") ||
      (formItem.jenisKelamin != null && formItem.jenisKelamin != "") ||
      (formItem.kabupaten != null && formItem.kabupaten != "") ||
      (formItem.kecamatan != null && formItem.kecamatan != "") ||
      (formItem.password != null && formItem.password != "") ||
      (formItem.phone != null && formItem.phone != "") ||
      (formItem.provinsi != null && formItem.provinsi != "") ||
      (formItem.tanggalLahir != null && formItem.tanggalLahir != "") ||
      (formItem.username != null && formItem.username != "") ||
      (formItem.confirmPassword != null && formItem.confirmPassword != "")
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
                PROFILE
              </Text>
            </View>
          </View>
          {/* <Left />
                    <Body>
                        <Text>PROFILE</Text>
                    </Body>
                    <Right /> */}
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <FormText
                item={{
                  // label: 'Full Name',
                  placeholder: "Full Name",
                  value: this.state.formItem.fullName,
                }}
                changeText={this._changeFullName}
              />
            </View>
            <View>
              <FormText
                disabled={true}
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
                  // label: 'Email',
                  placeholder: "Email",
                  value: this.state.formItem.email,
                }}
                changeText={this._changeEmail}
              />
            </View>
            {/* <View>
                            <FormText item={{
                                // label: 'Tanggal Lahir',
                                placeholder: 'Tanggal Lahir',
                                value: this.state.formItem.tanggalLahir
                            }}
                                changeText={this._changeTanggalLahir}
                            />
                        </View> */}
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
                paddingTop: 15,
              }}
            >
              <TouchableOpacity onPress={this._showDateTimePicker}>
                {this.state.formItem.tanggalLahir == null ? (
                  <Text
                    horizontalColumn
                    style={{
                      color: colorBlack,
                      fontWeight: "bold",
                      paddingLeft: 5,
                      fontSize: moderateScale(14),
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
                  // label: 'No. HP',
                  placeholder: "No. HP",
                  value: this.state.formItem.phone,
                }}
                changeText={this._changePhone}
              />
            </View>
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              <Picker
                mode="dropdown"
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#000000",
                  borderRadius: 10,
                }}
                selectedValue={this.state.formItem.jenisKelamin}
                onValueChange={this.onValueChangeJenisKelamin.bind(this)}
                placeholder="Jenis Kelamin"
              >
                <Picker.Item label="Jenis Kelamin" value="0" />
                {this.state.listJenisKelamin.map((data, i) => {
                  return (
                    <Picker.Item key={i} label={data.text} value={data.value} />
                  );
                })}
              </Picker>
            </View>
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 10,
                paddingTop: 5,
              }}
            >
              <Picker
                mode="dropdown"
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#000000",
                  borderRadius: 10,
                }}
                selectedValue={this.state.formItem.provinsi}
                onValueChange={this.onValueChangeProvinsi.bind(this)}
                placeholder="Provinsi"
              >
                <Picker.Item label="Provinsi" value="0" />
                {this.state.listProvinsi.map((data, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={data.namaProvinsi}
                      value={data.id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View
              style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 10 }}
            >
              <Picker
                mode="dropdown"
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#000000",
                  borderRadius: 10,
                }}
                selectedValue={this.state.formItem.kabupaten}
                onValueChange={this.onValueChangeKabupaten.bind(this)}
                placeholder="Kabupaten"
              >
                <Picker.Item label="Kabupaten" value="0" />
                {this.state.listKabupaten.map((data, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={data.namaKabupaten}
                      value={data.id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View
              style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}
            >
              <Picker
                mode="dropdown"
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#000000",
                  borderRadius: 10,
                }}
                selectedValue={this.state.formItem.kecamatan}
                onValueChange={this.onValueChangeKecamatan.bind(this)}
                placeholder="Kecamatan"
              >
                <Picker.Item label="Kecamatan" value="0" />
                {this.state.listKecamatan.map((data, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={data.namaKecamatan}
                      value={data.id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View>
              <FormText
                item={{
                  // label: 'Alamat',
                  placeholder: "Alamat",
                  value: this.state.formItem.alamat,
                }}
                changeText={this._changeAlamat}
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

export default ProfileUpdateScreen;

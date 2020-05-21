import {Container, Content, Header, Icon, Text, View} from 'native-base';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Product from '../../components/Item/Product.js';
import {colorBlack, colorPrimary} from './../../../app.json';
import {
  arrayToString,
  convertNumber,
  convertToLetterCase,
} from './../../../native-base-theme/variables/convert';
import Toast from './../../components/Toast';
import {apiCall, getAsyncStoreLoad} from './../../redux/actions/commonAction';
import endPoint from './../../redux/service/endPoint';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const WIDTH2 = Dimensions.get('window').width - 100;
class ProductDetailScreen extends React.Component {
  static navigationOptions = {header: null};

  state = {
    dataUser: null,
    personalData: null,
    productDetail: null,
    listOfProductExclude: [],
    activeSlide: 0,
    listDays: [
      {
        text: 'Senin',
        value: 'MONDAY',
      },
      {
        text: 'Selasa',
        value: 'TUESDAY',
      },
      {
        text: 'Rabu',
        value: 'WEDNESDAY',
      },
      {
        text: 'Kamis',
        value: 'THURSDAY',
      },
      {
        text: 'Jumat',
        value: 'FRIDAY',
      },
      {
        text: 'Sabtu',
        value: 'SATURDAY',
      },
      {
        text: 'Minggu',
        value: 'SUNDAY',
      },
    ],
  };

  componentDidMount = () => {
    getAsyncStoreLoad('dataUser', this.getDataUser);
    getAsyncStoreLoad('personalData', this.getPersonalData);
  };

  getDataUser = dataUser => {
    this.setState({dataUser}, () => {
      this.getProductDetail();
      this.listOfProductExclude();
    });
  };

  getPersonalData = personalData => {
    this.setState({personalData});
  };

  getProductDetail = () => {
    let data = this.props.navigation.state.params.data;
    let api = endPoint.getProductDetail + '/' + data.id;
    let header = {headers: {'Content-Type': 'application/json'}};
    apiCall.get(api, header, this.responeProductDetail);
  };

  listOfProductExclude = () => {
    let data = this.props.navigation.state.params.data;
    let api =
      endPoint.listOfProductExclude +
      '?vendorId=' +
      data.vendorVO.id +
      '&productId=' +
      data.id +
      '&limit=12';
    let header = {headers: {'Content-Type': 'application/json'}};
    apiCall.get(api, header, this.responeListOfProductExclude);
  };

  responeProductDetail = callback => {
    console.log('callback', callback);
    if (callback != null && callback.data.message == 'OK') {
      this.setState({productDetail: callback.data.result});
    }
  };

  responeListOfProductExclude = callback => {
    console.log('callback', callback);
    if (callback != null && callback.data.message == 'OK') {
      this.setState({listOfProductExclude: callback.data.result});
    }
  };

  _actionDetail = data => {
    this.props.navigation.push('ProductDetail', {data: data});
  };

  _renderItem({item}) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'FFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item.fileName}}
          style={{width: WIDTH, height: 275, resizeMode: 'contain', flex: 1}}
        />
      </View>
    );
  }

  render() {
    let renderProduct = null;
    let productDetail = this.state.productDetail;
    let listDays = this.state.listDays;
    let rating = [];
    let j;
    let daysOpen = [];
    if (productDetail != null) {
      productDetail.vendorVO.openHourlyResponseVOList.map((data, i) => {
        let index = listDays.findIndex(x => x.value == data.daysOpen);
        if (index >= 0)
          daysOpen.push(convertToLetterCase(listDays[index].text));
      });

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
        <View style={{padding: 0}}>
          <Carousel
            ref={'carousel'}
            layout={'default'}
            data={productDetail.image}
            renderItem={this._renderItem}
            sliderWidth={WIDTH}
            itemWidth={WIDTH}
            loop={true}
            enableSnap={true}
            firstItem={0}
            fadeDuration={0}
            onSnapToItem={index => this.setState({activeSlide: index})}
            style={{
              padding: 0,
              margin: 0,
              shadowOffset: {width: 1, height: 1},
              shadowColor: 'grey',
              shadowOpacity: 0.2,
            }}
          />
          <Pagination
            dotsLength={productDetail.image.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              backgroundColor: 'transparent',
              position: 'absolute',
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
              backgroundColor: '#000000',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingTop: 10,
              paddingRight: 10,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text>
              {convertToLetterCase(productDetail.serviceType) +
                ' - ' +
                convertToLetterCase(productDetail.kategory)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                marginLeft: 10,
                marginTop: 10,
              }}>
              {rating.map((rtg, l) => {
                return (
                  <Icon
                    key={l}
                    type="FontAwesome"
                    name={rtg.picked ? 'star' : 'star-o'}
                    style={{color: colorBlack, fontSize: 20}}
                  />
                );
              })}
            </View>
          </View>
          <Text style={{marginLeft: 10}}>
            {'Rp. ' +
              convertNumber(productDetail.hargaRangeAwal) +
              ' - Rp. ' +
              convertNumber(productDetail.hargaRangeAkhir)}
          </Text>
          <Text style={{marginLeft: 10}}>
            {productDetail.vendorVO.kecamatan.namaKecamatan +
              ', ' +
              productDetail.vendorVO.kabupaten.namaKabupaten +
              ', ' +
              productDetail.vendorVO.provinsi.namaProvinsi}
          </Text>
          <Text style={{marginLeft: 10}}>
            {'No. HP ' + productDetail.vendorVO.phone}
          </Text>
          <Text style={{marginLeft: 10}}>{arrayToString(daysOpen)}</Text>
          <Text style={{marginLeft: 10}}>
            {productDetail.vendorVO.openHourlyResponseVOList[0].startOpen.substring(
              0,
              5,
            ) +
              ' - ' +
              productDetail.vendorVO.openHourlyResponseVOList[0].endOpen.substring(
                0,
                5,
              ) +
              ' WIB'}
          </Text>
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
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, paddingLeft: 15}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <Icon name="arrow-back" style={{color: colorBlack}} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 8,
                paddingRight: 10,
                height: '100%',
                justifyContent: 'center',
              }}>
              {productDetail != null && (
                <Text
                  style={{color: colorBlack, fontSize: 22, fontWeight: 'bold'}}>
                  {productDetail.vendorVO.vendorName}
                </Text>
              )}
            </View>
          </View>
        </Header>
        <Content>
          <View style={{padding: 0}}>{renderProduct}</View>
          {this.state.listOfProductExclude.length > 0 && (
            <View>
              <View
                style={{
                  marginTop: 15,
                  borderTopColor: colorBlack,
                  borderTopWidth: 1,
                }}
              />
              <View style={{paddingLeft: 15}}>
                <Text
                  style={{color: colorBlack, fontSize: 22, fontWeight: 'bold'}}>
                  {'Produk Lainnya di Toko ini'}
                </Text>
              </View>
              <View horizontalRow padderTop horizontal={true}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={false}>
                  {this.state.listOfProductExclude.map((data, i) => {
                    return (
                      <Product
                        key={i}
                        item={data}
                        _actionDetail={this._actionDetail}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
        </Content>
        <Toast ref="defaultToastBottom" position="bottom" />
      </Container>
    );
  }
}

export default ProductDetailScreen;

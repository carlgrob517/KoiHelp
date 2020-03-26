import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Image,
  Text,
  Icon,
  Card,
  SafeAreaView,
  Tag,
  CardList
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import Swiper from "react-native-swiper";
import {
  HomeServicesData,
  HomePopularData,
  HomeListData,
  HomeBannerData
} from "@data";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      banner: HomeBannerData,
      location: [
        { id: "1", name: "Delux Room" },
        { id: "2", name: "Tripple Room" },
        { id: "3", name: "Single Room" },
        { id: "4", name: "King Room" },
        { id: "5", name: "King Room" }
      ],
      services: HomeServicesData,
      popular: HomePopularData,
      list: HomeListData,
      heightHeader: Utils.heightHeader()
    };
    this._deltaY = new Animated.Value(0);
  }

  /**
   * @description Show location on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  renderLocation() {
    const { navigation } = this.props;
    return this.state.location.map((item, i) => {
      return (
        <Tag
          gray
          key={item.id}
          onPress={() => {}}
          style={{
            backgroundColor: BaseColor.fieldColor,
            marginTop: 5
          }}
        >
          <Text caption2>{item.name}</Text>
        </Tag>
      );
    });
  }


  render() {
    const { navigation } = this.props;
    const { banner, services, popular, list, heightHeader } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(225);
    const marginTopBanner = heightImageBanner - heightHeader + 10;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(150),
                  Utils.scaleWithPixel(150)
                ],
                outputRange: [heightImageBanner, heightHeader, 0]
              })
            }
          ]}
        >
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.textSecondaryColor                            
            }}            
            activeDotColor={BaseColor.primaryColor}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {banner.map((item, index) => {
              return (                
                <Image key={item.id} source={item.image} style={{ flex: 1 }} />
              );
            })}
          </Swiper>
        </Animated.View>


        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() => {
              this.setState({
                heightHeader: Utils.heightHeader()
              });
            }}
            scrollEventThrottle={8}
          >


            <View style={{marginTop:marginTopBanner + 35 }}>                            
            </View>
            {/* services */}
            <FlatList
              contentContainerStyle={{ padding: 20 }}
              data={services}
              numColumns={4}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.serviceItem}
                    onPress={() => navigation.navigate('Explain')}
                  >
                    <View
                      style={[
                        styles.serviceCircleIcon,
                        { backgroundColor: item.color }
                      ]}
                    >
                      {/* <Icon
                        name={item.icon}
                        background={item.icon}
                        size={20}
                        color={BaseColor.whiteColor}
                        solid
                      /> */}
                      <Image  source={item.icon} style={{ width: 25, height:25 }} />

                    </View>
                    <Text
                      footnote
                      style={{
                        marginTop: 5,
                        marginBottom: 20
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            {/* Hiking */}
            {/* <View style={styles.contentPopular}>
              <Text title3 semibold>
                Top Services
              </Text>
              <Text body2 grayColor>
                Recent Top services 
              </Text>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={popular}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <Card
                  style={[
                    styles.popularItem,
                    index == 0 ? { marginHorizontal: 20 } : { marginRight: 20 }
                  ]}
                  image={item.image}
                  // onPress={() => navigation.navigate("PlaceDetail")}
                >
                  <Text headline whiteColor semibold>
                    {item.name}
                  </Text>
                </Card>
              )}
            /> */}
            
            <View
              style={{
                padding: 20
              }}
            >              
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

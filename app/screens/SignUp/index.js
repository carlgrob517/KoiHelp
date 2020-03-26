import React, { Component } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button, Text } from "@components";
import styles from "./styles";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      loading: false,
      success: {
        name: true,
        email: true,
        address: true
      }
    };
  }

  onSignUp() {
    
    const { navigation } = this.props;
    navigation.navigate("Home");

    // const { navigation } = this.props;
    // let { name, email, address, success } = this.state;
    // if (name == "" || email == "" || address == "") {      
      
    //   this.setState({
    //     success: {
    //       ...success,
    //       name: name != "" ? true : false,
    //       email: email != "" ? true : false,
    //       address: address != "" ? true : false
    //     }
    //   });

    // } else {
    //   this.setState(
    //     {
    //       loading: true
    //     },
    //     () => {
          
    //       setTimeout(() => {
    //         this.setState({
    //           loading: false
    //         });
    //         navigation.navigate("SignIn");
    //       }, 500);
    //     }
    //   );
    // }
  }

  render() {
    const { navigation } = this.props;
    let { loading, name, email, address, success } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon
                style={{marginTop:20}}
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            
            <View style={{marginTop:10, width:"100%"}}>
              <Text title2 semibold  numberOfLines={1}  style={{marginTop:0,marginLeft:5, marginBottom:5, fontFamily:'Raleway-SemiBold' }} >
                Sign up
              </Text>                                     
            </View>


            
            <View style={{width:"100%", marginTop:20}}>
              <Text grayColor Raleway numberOfLines={1}  style={{marginTop:10,marginLeft:5}} >
                Email
              </Text>                                     
            </View>

            <TextInput
              style={[BaseStyle.textInputUnderline, { marginTop: 0 , fontSize:12, }]}
              onChangeText={text => this.setState({ name: text })}
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={
                success.name ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={name}
            />

            <View style={{width:"100%", marginTop:10}}>
              <Text grayColor Raleway numberOfLines={1}  style={{marginTop:10,marginLeft:5}} >
                Password
              </Text>                                     
            </View>

            <TextInput
              style={[BaseStyle.textInputUnderline, { marginTop: 0 , fontSize:12}]}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              placeholder="Password"              
              placeholderTextColor={
                success.email ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={email}
            />

            <View style={{width:"100%", marginTop:10}}>
              <Text grayColor Raleway numberOfLines={1}  style={{marginTop:10,marginLeft:5}} >
                Confirm Password
              </Text>                                     
            </View>


            <TextInput
              style={[BaseStyle.textInputUnderline, { marginTop: 0 , fontSize:12}]}
              onChangeText={text => this.setState({ address: text })}
              autoCorrect={false}
              placeholder="Confirm password"
              placeholderTextColor={
                success.address ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={address}
            />
            <View style={{ width: "100%" }}>
              <Button
                full
                style={{ marginTop: 20, height:46 }}
                loading={loading}
                onPress={() => this.onSignUp()}
              >
                Sign Up
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

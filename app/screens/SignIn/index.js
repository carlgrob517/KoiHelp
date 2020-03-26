import React, { Component , useState} from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput , BackHandler} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './types'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "test",
      country:'usa',
      cca2: 'US',
      callingCode:[1],
      password: "123456",
      flag:'',
      loading: false,
      success: {
        id: true,
        password: true
      }
    };
  }

  onLogin() {
    const { phone, password, success } = this.state;
    const { navigation } = this.props;
    const { dispatch } = this.props;

    if (phone == "" || password == "") {
      this.setState({
        success: {
          ...success,
          phone: false,
          password: false
        }
      });
    } else {
      this.setState(
        {
          loading: false
        },
        () => {          
          
          navigation.navigate("SignUp");

        }
      );
    }
  }




  render() {

    const { navigation } = this.props;
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
            //navigation.goBack();
            BackHandler.exitApp()
          }}
        />
        <ScrollView>
          <View style={styles.contain}>

            <View style={{marginTop:10}}>
              <Text title2 semibold numberOfLines={1}  style={{marginTop:0,marginLeft:5, marginBottom:5, fontFamily:'Raleway-SemiBold' }} >
                Phone Verification
              </Text>                                     
            </View>


            <View>
              <Text grayColor numberOfLines={1}  style={{marginTop:10,marginLeft:5, marginBottom:5}} >
                Please enter your mobile phone number.
              </Text>                                     
            </View>

            
            

            <View style={ [BaseStyle.textInput,{flexDirection:"row", marginTop: 30, alignItems:"center"}] }>
                <CountryPicker         
                    ref={(instance) => {
                      this.countryPicker = instance;
                    }}       
                    onSelect={(value)=> this.setState({country: value.name, cca2: value.cca2, flag:value.flag, callingCode:value.callingCode })}
                    cca2={this.state.cca2}
                    countryCode = {this.state.cca2}
                    withFilter = {true}
                    withEmoji = {true}
                    withFlag = {true}
                    withCountryNameButton = {true}
                    withCloseButton = {true}
                    withAlphaFilter = {true}
                    visible={false}                    
                    translation='eng'/>

                <View style={[styles.container, {  }]}>                             
                  <TouchableOpacity
                      onPress={() => {
                        this.countryPicker.onOpen();
                      }}
                    >
                    <Text style={{marginLeft:0}}>
                        +{this.state.callingCode[0]}
                    </Text>
                  </TouchableOpacity>
                                          
                    
                    <TextInput
                      style={[BaseStyle.textInput, { marginTop: 0 , paddignLeft:15 }]}
                      onChangeText={text => this.setState({ phone: text })}
                      onFocus={() => {
                        this.setState({
                          success: {
                            ...this.state.success,
                            id: true
                          }
                        });
                      }}
                      autoCorrect={false}
                      placeholder="Phone Number"
                      underlineColorAndroid='transparent'
                      keyboardType={'numeric'}
                      maxLength = {10}
                      placeholderTextColor={
                        this.state.success.id
                          ? BaseColor.grayColor
                          : BaseColor.primaryColor
                      }
                      value={this.state.id}
                      selectionColor={BaseColor.primaryColor}
                    />                                
                </View>

                
            </View>

            


            <View style={{flexDirection:"row", marginTop:15}}>
              <View style={[styles.container, {  }]}>                                       
                  <Text style={{marginLeft:20}}>
                      PIN
                  </Text>

                  <TextInput
                    style={[BaseStyle.textInput, { marginTop: 0 , paddingLeft:10 }]}
                    onChangeText={text => this.setState({ phone: text })}
                    onFocus={() => {
                      this.setState({
                        success: {
                          ...this.state.success,
                          id: true
                        }
                      });
                    }}
                    autoCorrect={false}
                    placeholder="Enter PIN"
                    underlineColorAndroid='transparent'
                    keyboardType={'numeric'}
                    maxLength = {10}
                    placeholderTextColor={
                      this.state.success.id
                        ? BaseColor.grayColor
                        : BaseColor.primaryColor
                    }
                    value={this.state.id}
                    selectionColor={BaseColor.primaryColor}
                  />       
                
              </View>
              <Button                        
                    style={{width:120, marginLeft:20, height:46}}  
                    loading={this.state.loading}                  
                    onPress={() => {
                      
                    }}>                      
                    Resend
                </Button>
            </View>
            


            
            <View style={{ width:'100%', justifyContent:'center', alignItems:'center' , marginTop:15 }}>
              <Button
                full        
                loading={this.state.loading}
                style={{ marginTop: 20 , width:150, height:46 }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                REGISTER
              </Button>
            </View>



            <View style={{marginTop:15}}>
              <Text grayColor  style={{marginTop:10,marginLeft:5, marginBottom:5}} >
                By Checking start. you agree to our 
                <Text primaryColor> Term and{'\n'}Conditions.</Text>
              </Text>
            </View>

            

            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text body1 grayColor style={{ marginTop: 25 }}>
                {/* Create a new user  */}
                {/* Forgot your password? */}                
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

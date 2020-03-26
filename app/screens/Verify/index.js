import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput , BackHandler} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "1234",      
      loading: false,
      success: {
        code: true,        
      }
    };
  }

  onLogin() {
    const { code, success } = this.state;
    const { navigation } = this.props;
    const { dispatch } = this.props;

    if (code == "") {
      this.setState({
        success: {
          ...success,
          code: false,          
        }
      });
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
      
                         
          navigation.navigate("Home");

          
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
            navigation.goBack();            
          }}
        />
        <ScrollView>
          <View style={styles.contain}>


            <View style={{marginTop:10}}>
              <Text title2 semibold numberOfLines={1}  style={{marginTop:0,marginLeft:5, marginBottom:5, fontFamily:'Raleway-SemiBold' }} >
                Phone Verification
              </Text>                                     
            </View>


            <Text grayColor numberOfLines={1}  style={{marginTop:50, marginLeft:5,marginBottom:5}} >
              Enter Sms Code
            </Text>

            <TextInput
              style={[BaseStyle.textInput, { marginTop: 0 }]}
              onChangeText={text => this.setState({ id: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    code: true
                  }
                });
              }}
              autoCorrect={false}
              placeholder="Phone Number"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.grayColor
                  : BaseColor.grayColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />


            <View style={{ width:'100%', justifyContent:'center', alignItems:'center'  }}>
              <Button
                full
                loading={this.state.loading}
                style={{ marginTop: 20 , width:150, borderRadius:50 }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                VERIFY
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
